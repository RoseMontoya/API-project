import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'store/spot/LOAD_SPOTS'
const LOAD_DETAILS = 'store/spot/LOAD_DETAILS'
const LOAD_REVIEWS = 'store/spot/LOAD_REVIEWS'
const ADD_SPOT = 'store/spot/ADD_SPOT'
const LOAD_CURRENT_SPOTS = 'store/spot/LOAD_CURRENT_SPOTS'
const ADD_REVIEW = 'store/spot/ADD_REVIEW'


// Action
const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

const loadSpotDetails = (spot) => {
    return {
        type: LOAD_DETAILS,
        spot
    }
}

const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    }
}

const currentSpots = (spots) => {
    return {
        type: LOAD_CURRENT_SPOTS,
        spots
    }
}

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}


// Thunk
export const loadAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    const data = await response.json();
    dispatch(loadSpots(data.Spots))
    return data
}

export const loadSpot = (spotId) => async dispatch => {
    // Load Spot
    const response = await csrfFetch(`/api/spots/${spotId}`)
    const spot = await response.json();
    await dispatch(loadSpotDetails(spot))

    // Load Spot Reviews
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const reviews = await res.json();
    await dispatch(loadReviews(reviews.Reviews))

    // Return spot
    spot.reviews = reviews.Reviews
    return spot;
}

export const createSpot = (spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        body: JSON.stringify(spot)
    })
    const newSpot = await response.json()
    dispatch(addSpot(newSpot));
    return newSpot;
}

export const addSpotImage = (image, spotId) => async () => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        body: JSON.stringify(image)
    })
    return response
}

export const loadCurrentSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current')
    const data = await response.json();
    dispatch(currentSpots(data.Spots))
    return data.Spots
}

export const editSpot = (spot, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: JSON.stringify(spot)
    })
    const updatedSpot = await response.json();
    dispatch(addSpot(updatedSpot));
    return updatedSpot;
}

export const createReview =( review, spotId ) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review)
    })
    const newReview = await response.json();
    dispatch(loadSpot(spotId))
    return newReview
}


// Reducer

const spotReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const spots = {}
            action.spots.forEach(spot => {
                spots[spot.id] = spot
            })
            return {...state, spots: {...spots}}
        }
        case LOAD_DETAILS: {
            return {...state, currentSpot : action.spot}
        }
        case LOAD_REVIEWS: {
            const reviews = {}
            action.reviews.forEach(review => {
                reviews[review.id] = review
            })
            return {...state, currentSpot: {...state.currentSpot, reviews: reviews}}
        }
        case ADD_SPOT: {
            return {...state, spots: {...state.spots, [action.spot.id]: action.spot}}
        }
        case LOAD_CURRENT_SPOTS: {
            const currentSpots = {};
            action.spots.forEach(spot => {
                currentSpots[spot.id] = spot
            });
            return {...state, currentSpots: {...currentSpots}}

        }
        case ADD_REVIEW: {
            return {...state, currentSpot: {...state.currentSpot, reviews: {...state.currentSpot.reviews, [action.review.id]: action.review}}}
        }
        default:
            return state;
    }
}

export default spotReducer;
