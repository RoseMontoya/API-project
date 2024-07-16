const reviewimage = require("../db/models/reviewimage");

const formatDate =  async (date, type) => {
    if (!date) return date;
    date = await Promise.resolve(date.toJSON());
    date = date.split('T')
    let res;
    if (type === 'date') {
        res = date[0]
    } else {
        const time = date[1].split('.');
        res = [date[0], time[0]].join(' ')
    }
    return res;
}

const makeSpotObj = async (spot) => {

    const obj = {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: +spot.lat,
        lng: +spot.lng,
        name: spot.name,
        description: spot.description,
        price: +(Number(spot.price).toFixed(2)),
        createdAt: await formatDate(spot.createdAt),
        updatedAt: await formatDate(spot.updatedAt)
    }

    return obj
}

const makeReviewObj = async (review) => {
    const obj = {
        id: review.id,
        userId: review.userId,
        spotId: review.spotId,
        review: review.review,
        stars: parseInt(review.stars),
        createdAt: await formatDate(review.createdAt),
        updatedAt: await formatDate(review.updatedAt)
    }

    return obj;
}

const makeBookingObj = async (booking) => {
    const obj = {
        id: booking.id,
        spotId: booking.spotId,
        userId: booking.userId,
        startDate: await formatDate(booking.startDate, 'date'),
        endDate: await formatDate(booking.endDate, 'date'),
        createdAt: await formatDate(booking.createdAt),
        updatedAt: await formatDate(booking.updatedAt)
    }
    return obj
}

module.exports = { makeSpotObj, makeReviewObj, makeBookingObj, formatDate }
