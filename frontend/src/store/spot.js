import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'store/spot/LOAD_SPOTS'


// Action
const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

// Thunk
export const loadAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    const spots = await response.json();
    dispatch(loadSpots(spots))
    return spots
}


// Reducer

const spotReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            return {...state, ...action.spots}
        }
        default:
            return state;
    }
}

export default spotReducer;
