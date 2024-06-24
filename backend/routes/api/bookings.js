// * Imports
const express = require('express');
const { Sequelize, Op } = require('sequelize');

const {requireAuth, authorization} = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking} = require('../../db/models')

const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


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

// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
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
