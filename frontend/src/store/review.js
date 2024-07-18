// import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = '/store/review/LOAD_REVIEWS'

// Action
// const loadReviews = (reviews) => {
//     return {
//         type: LOAD_REVIEWS,
//         reviews
//     }
// }

// Thunks
// export const loadAllReviews = (spotId) => async dispatch => {
//     const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
//     const data = await response.json();
//     console.log(data)
//     dispatch(loadReviews(data.Reviews))
//     return data;
// }

// export const createReview =( review, spotId ) => async dispatch => {
//     const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
//         method: 'POST',
//         body: JSON.stringify(review)
//     })

//     const newReview = await response.json();
//     await dispatch(loadAllReviews(spotId));
//     dispatch(loadSpot(spotId))
//     return newReview
// }

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
