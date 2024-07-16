const express = require('express');

const {requireAuth, authorization} = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models')


const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res, next) => {
    const image = await SpotImage.findByPk(req.params.imageId, {
        include: {
            model: Spot,
            attributes: ['ownerId']
        }
    });

    // Checking if spot image exists
    if (!image) {
        const err = new Error("Spot image couldn't be found");
        err.title = 'Not found'
        err.status = 404;
        return next(err);
    }

    // Check if authorized
    const authorized = authorization(req, image.Spot.ownerId);
    if (authorized !== true) return next(authorized);

    await image.destroy();
    res.json({ "message": "Successfully deleted" })
})

module.exports = router;
