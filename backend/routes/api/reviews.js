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

    const result = { Reviews: reviews}

    res.json(result)
});

//Post
// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);

    // Check that review exists
    if (!review ) {
        const err = new Error("Review couldn't be found");
        err.title = 'Not found'
        err.status = 404;
        return next(err);
    }

    // check user is authorized
    const authorized = authorization(req, review.userId);
    if (authorized !== true) return next(authorized);

    // check max
    const imageCount = await ReviewImage.count({
        where: {
            reviewId: review.id
        }
    });

    if (imageCount === 10) {
        const err = new Error("Maximum number of images for this resource was reached");
        err.title = 'Maximum number of images reached'
        err.status = 403;
        return next(err);
    };

    const newImage = await review.createReviewImage(req.body);
    res.json({ id: newImage.id, url: newImage.url})
})


module.exports = router;
