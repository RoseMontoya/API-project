// * Imports
const express = require('express');
const { Sequelize, Op } = require('sequelize');

const {requireAuth, authorization} = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking} = require('../../db/models')

const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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

const router = express.Router();

// Get
// get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res, next) => {
    const bookings = await Booking.findAll({
        where: { userId: req.user.id},
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                }
            }
        ]
    })

    await Promise.all(bookings.map(async booking => {
        const previewImg = await SpotImage.findOne( {
            where: {
                spotId: booking.spotId,
                preview: true
            }
        });
        booking.dataValues.Spot.dataValues.previewImage = previewImg !== null? previewImg.url : previewImg;
    }))

    res.json({ Bookings: bookings})
})

// Put
// Edit a Booking
router.put('/:bookingId', requireAuth, validateBooking, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    if (!booking) {
        const err = new Error("Booking couldn't be found");
        err.title = 'Not found'
        err.status = 404;
        return next(err);
    }

    // check user is authorized
    const authorized = authorization(req, booking.userId);
    if (authorized !== true) return next(authorized);

    // Checking booking is in the past
    const currentDate = new Date();
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate)

    if (startDate <= currentDate) {
        const err = new Error('Past bookings can\'t be modified')
        err.status = 403
        return next(err)
    }


    // Check if conflicts with other bookings
    const otherBookings = await Booking.findAll({
        where: {
            spotId: booking.spotId,
            id : {
                [Op.ne]: req.params.bookingId
            }
        },
        attributes: ['startDate', 'endDate']
    });

    const err = new Error('Sorry, this stop is already booked for the specified dates');
    err.title = 'Booking conflict'
    err.status = 403

    otherBookings.forEach(booking => {

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

    await booking.update(req.body)

    res.json(booking)
})

// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    if (!booking) {
        const err = new Error("Booking couldn't be found");
        err.title = 'Not found'
        err.status = 404;
        return next(err);
    };

    // check user is authorized
    const authorized = authorization(req, booking.userId);
    if (authorized !== true) return next(authorized);

    // check if booking has been started
    const currentDate = new Date();
    if (booking.startDate <= currentDate) {
        const err = new Error("Bookings that have been started can't be deleted");
        err.status = 403;
        return next(err)
    }

    await booking.destroy();
    res.json({ "message": "Successfully deleted" })
})

module.exports = router;
