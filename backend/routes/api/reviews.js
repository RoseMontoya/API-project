// * Imports
const express = require('express');
const { Sequelize, Op } = require('sequelize');

const {requireAuth, authorization} = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models')

const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get
// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes:  ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['updatedAt', 'createdAt', 'description']
                }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    await Promise.all(reviews.map(async review => {
        const previewImg = await SpotImage.findOne( {
            where: {
                spotId: review.spotId,
                preview: true
            }
        });
        review.dataValues.Spot.dataValues.previewImage = previewImg.url
    }))

    console.log(reviews)
    const result = { Reviews: reviews}
    // console.log(result)

    res.json(result)
})


module.exports = router;
