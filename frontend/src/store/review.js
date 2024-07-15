import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = '/store/review/LOAD_REVIEWS'

// Action
const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

// Thunks
export const loadAllReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const data = await response.json();
    dispatch(loadReviews(data.Reviews))
    return data;
}

// Reducer
const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const reviews = {}
            action.reviews.forEach(review => {
                reviews[review.id] = review
            })
            return {...reviews}
        }
        default:
            return state;
    }
}

export default reviewReducer;
