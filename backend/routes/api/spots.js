// * Imports
const express = require('express');
const { Sequelize, Op } = require('sequelize');

const {requireAuth, authorization} = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models')

const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Validation New Spot Middleware
const validateNewSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    body('lat').custom( value => {
        if (value < -90 || value > 90) {
            throw new Error('Latitude must be with -90 and 90')
        } else return true
    }),
    body('lng').custom( value => {
        if (value < -180 || value > 180) {
            throw new Error('Longitude must be within -180 and 180')
        } else return true
    }),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    body('price').custom(value => {
        if (value < 0) throw new Error('Price per day must be a positive number')
        else return true
    }),
    handleValidationErrors
]

const validateReview = [
    check("review")
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5})
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

const validateQuery = [
    check('page')
        .optional()
        .isInt({ min: 1})
        .withMessage('Page must be greater than or equal to 1'),
    check('size')
        .optional()
        .isInt({ min: 1})
        .withMessage('Size must be greater than or equal to 1'),
    check('maxLat')
        .optional()
        .custom( value => {
        if (value < -90 || value > 90 || isNaN(value)) {
            throw new Error('Maximum latitude is invalid')
        } else return true
    }),
    check('minLat')
        .optional()
        .custom( value => {
        if (value < -90 || value > 90 || isNaN(value)) {
            throw new Error('Minimum latitude is invalid')
        } else return true
    }),
    check('minLng')
        .optional()
        .custom( value => {
        if (value < -180 || value > 180 || isNaN(value)) {
            throw new Error('Minimum longitude is invalid')
        } else return true
    }),
    check('minLng')
        .optional()
        .custom( value => {
        if (value < -180 || value > 180 || isNaN(value)) {
            throw new Error('Minimum longitude is invalid')
        } else return true
    }),
    check('minPrice')
        .optional()
        .custom(value => {
        if (value < 0) throw new Error('Minimum price must be greater than or equal to 0')
        else return true
    }),
    check('maxPrice')
        .optional()
        .custom(value => {
        if (value < 0) throw new Error('Maximum price must be greater than or equal to 0')
        else return true
    }),
    handleValidationErrors
]

const validateBooking = [
    check('startDate')
        .exists({ checkFalsy: true })
        .custom( value => {
            const currentDate = new Date();
            const startDate = new Date(value)
            if (currentDate > startDate) {
                throw new Error ('startDate cannot be in the past');
            } else return true
        }),
    check('endDate')
        .exists({ checkFalsy: true })
        .custom((value, {req}) => {
            const startDate = new Date(req.body.startDate);
            const endDate = new Date(value)

            if (endDate <= startDate) {
                throw new Error ('endDate cannot be on or before startDate')
            } else return true
        }),
    handleValidationErrors
]

// * Routes
const router = express.Router();

// Get

// Get all Spots
router.get('/', validateQuery, async (req, res) => {
    let {page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice} = req.query;

    // Pagination
    const pagination = {};
    page = !page ? 1 : parseInt(page);
    size = !size? 20 : parseInt(size);

    pagination.limit = size;
    pagination.offset = size * (page - 1);


    // Where Query Options

    const where = {};
    if (minLat) where.lat = { [Op.gte]: minLat}
    if (maxLat) where.lat = { ...where.lat, [Op.lte]: maxLat}
    if (minLng) where.lng = { [Op.gte]: minLng}
    if (maxLng) where.lng = { ...where.lng, [Op.lte]: maxLng}
    if (minPrice) where.price = { [Op.gte]: minPrice}
    if (maxPrice) where.price = { ...where.price, [Op.lte]: maxPrice}

    // Find spots
    const allSpots = await Spot.findAll({
        ...pagination,
        where,
    })

    // Add spot image preview to each spot
    await Promise.all(allSpots.map(async spot => {
        const avg = await Review.findAll({
            where: { spotId: spot.id },
            attributes: [[Sequelize.fn('avg', Sequelize.col('stars')),'avgRating']],
            raw: true
        });

        spot.dataValues.avgRating = avg[0].avgRating

        const previewImg = await SpotImage.findOne( {
            where: {
                spotId: spot.id,
                preview: true
            }
        });

        spot.dataValues.previewImage = previewImg !== null? previewImg.url : previewImg;
    }))
    const result = { Spots: allSpots, page, size}

    res.json(result);
});

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    console.log(user)

    const userSpots = await Spot.scope("allAttributes").findAll({
        where: {
            ownerId: user.id
        },
        attributes: [[Sequelize.fn('avg', Sequelize.col('Reviews.stars')),'avgRating']],
        include: [
            {
                model: Review,
                attributes: []
            }
        ],
        group: ['Spot.id']
    })

    await Promise.all(userSpots.map(async spot => {
        const previewImg = await SpotImage.findOne( {
            where: {
                spotId: spot.id,
                preview: true
            }
        });
        spot.dataValues.previewImage = previewImg !== null? previewImg.url : previewImg;
    }))
    const result = { Spots: userSpots}
    res.json(result);
});

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.title = 'Not found'
        err.status = 404;
        return next(err);
    }

    const spotReviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes:  ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    const reviews = { Reviews: spotReviews}
    res.json(reviews);
})

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.title = 'Not found'
        err.status = 404;
        return next(err);
    }

    let bookings;
    if (spot.ownerId === req.user.id) {
        bookings = await Booking.findAll({
            where: { spotId: spot.id },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        })
    } else {
        bookings = await Booking.findAll({
            where: {
                spotId: spot.id
            },
            attributes: ['spotId', 'startDate', 'endDate']
        })
    }
    res.json({ Bookings: bookings});
})

// Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId
    const spot = await Spot.scope().findByPk(spotId, {
        attributes: {
            include: [[Sequelize.fn('COUNT', Sequelize.col('Reviews.stars')), 'numReviews'],
                      [Sequelize.fn('avg', Sequelize.col('Reviews.stars')),'avgStarRating']]
        },
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: []
            }
        ],
        group: ['Spot.id']
    });

    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.title = 'Not found'
        err.status = 404;
        return next(err);
    }

    const spotObj = spot.toJSON();
    spotObj.SpotImages = await spot.getSpotImages({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'spotId']
        }
    });
    spotObj.Owner = await spot.getUser({
        where: {
            id: spot.ownerId
        },
        attributes: ['id', 'firstName', 'lastName']
    });

    res.json(spotObj)
})

// post
// Create a Spot
router.post("/", requireAuth, validateNewSpot, async (req, res, next) => {
    const { user } = req;

    const spot = await Spot.create({
        ownerId: user.id,
        ...req.body
    })

    return res.status(201).json(spot);
})

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.title = 'Not found'
        err.status = 404;
        return next(err);
    }

    const authorized = authorization(req, spot.ownerId);
    if (authorized !== true) return next(authorized);

    const newImage = await spot.createSpotImage(req.body)

    const image = {
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
    }
    res.json(image);
} )

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.title = 'Not found'
        err.status = 404;
        return next(err);
    };

    const existingReview = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId: spot.id
        }
    })
    if (existingReview) {
        const err = new Error('User already has a review for this spot');
        err.title = 'User already has a review for this spot';
        err.status = 500;
        return next(err);
    }

    const newReview = await spot.createReview({
        userId: req.user.id,
        ...req.body
    })

    res.status(201).json(newReview);
})

// Create a Booking for a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    // Checking that spot exists
    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.title = 'Not found'
        err.status = 404;
        return next(err);
    }

    // Checking if current user owns spot
    if (req.user.id === spot.ownerId) {
        const err = new Error('Cannot create booking for a spot you own')
        return next(err);
    }

    // Check if conflicts with other bookings
    const otherBookings = await Booking.findAll({
        where: { spotId: req.params.spotId},
        attributes: ['startDate', 'endDate']
    });

    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate)

    const err = new Error('Sorry, this stop is already booked for the specified dates');
    err.title = 'Booking conflict'
    err.status = 403

    otherBookings.forEach(booking => {
        console.log('current', booking.startDate, 'new', startDate)

        if ((startDate >= booking.startDate && startDate <= booking.endDate) || startDate === booking.startDate) {
            err.errors = {startDate : 'Start date conflicts with an existing booking'}
        }
        if (endDate >= booking.startDate && endDate <= booking.endDate) {
            err.errors = {...err.errors, endDate : 'End date conflicts with an existing booking'}

        }
        if (startDate < booking.endDate && endDate > booking.endDate) {
            err.errors = {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            }
        }
        if (err.errors) return next(err);
    });

    const newBooking = await Booking.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        startDate,
        endDate
    });

    res.json(newBooking)
})

// put
// Edit a Spot
router.put('/:spotId', requireAuth, validateNewSpot, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.title = 'Not found'
        err.status = 404;
        return next(err);
    }

    const authorized = authorization(req, spot.ownerId);
    if (authorized !== true) return next(authorized);

    const newSpot = await spot.update(req.body);
    res.json(newSpot)
})

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spotToDelete = await Spot.findByPk(req.params.spotId);
    if (!spotToDelete) {
        const err = new Error("Spot couldn't be found");
        err.title = 'Not found'
        err.status = 404;
        return next(err);
    }

    const authorized = authorization(req, spotToDelete.ownerId);
    if (authorized !== true) return next(authorized);

    await spotToDelete.destroy();
    res.json({ message: 'Successfully deleted'})
})

module.exports = router;
