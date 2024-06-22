const express = require('express');
// const bcrypt = require('bcryptjs');
const { Sequelize, Op } = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage } = require('../../db/models')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', async (_req, res) => {
    const allSpots = await Spot.findAll({
        attributes: [ "id", 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt',
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
})

module.exports = router;
