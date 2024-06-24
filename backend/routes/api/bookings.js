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

module.exports = router;
