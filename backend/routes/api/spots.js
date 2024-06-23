const express = require('express');
// const bcrypt = require('bcryptjs');
const { Sequelize, Op } = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage } = require('../../db/models')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', async (_req, res) => {
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

module.exports = router;
