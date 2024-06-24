const express = require('express');

const {requireAuth, authorization} = require('../../utils/auth');
const { Review, ReviewImage } = require('../../db/models')


const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res, next) => {
    const image = await ReviewImage.findByPk(req.params.imageId, {
        include: {
            model: Review,
            attributes: ['userId']
        }
    });

    // Checking if review exists
    if (!image) {
        const err = new Error("Review image couldn't be found");
        err.title = 'Not found'
        err.status = 404;
        return next(err);
    }

    // Check if authorized
    const authorized = authorization(req, image.Review.userId);
    if (authorized !== true) return next(authorized);

    await image.destroy();
    res.json({ "message": "Successfully deleted" })
})

module.exports = router;
