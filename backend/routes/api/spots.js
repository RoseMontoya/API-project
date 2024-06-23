// * Imports
const express = require('express');
const { Sequelize, Op } = require('sequelize');

const {requireAuth, authorization} = require('../../utils/auth');
const { Spot, Review, SpotImage } = require('../../db/models')

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

// * Routes
const router = express.Router();

// Get

// Get all Spots
router.get('/', async (_req, res) => {
    // Find spots
    const allSpots = await Spot.scope("allAttributes").findAll({
        attributes: [
            [Sequelize.fn('avg', Sequelize.col('Reviews.stars')),'avgRating'],
        ],
        include: [
            {
                model: Review,
                attributes: []
            }
        ],
        group: ['Spot.id']
    })

    // Add spot image preview to each spot
    await Promise.all(allSpots.map(async spot => {
        const previewImg = await SpotImage.findOne( {
            where: {
                spotId: spot.id,
                preview: true
            }
        });
        spot.dataValues.previewImage = previewImg.url
    }))

    res.json(allSpots);
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
        spot.dataValues.previewImage = previewImg.url
    }))
    res.json(userSpots);
});

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
        ]
    });

    if (!spot.id) {
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

module.exports = router;
