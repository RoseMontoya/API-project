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

    const data = await response.json();
    // console.log(data)
    dispatch(loadSpots(data.Spots))
    return data
}

export const loadSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    console.log('response', response)
    const spot = await response.json();
    dispatch(loadSpots([spot]))
    return spot;
}


// Reducer

const spotReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const spots = {}
            action.spots.forEach(spot => {
                spots[spot.id] = spot
            })
            return {...state, ...spots}
        }
        default:
            return state;
    }
}

export default spotReducer;
