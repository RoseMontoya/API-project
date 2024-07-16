import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'store/spot/LOAD_SPOTS'
const ADD_SPOT = 'store/spot/ADD_SPOT'


// Action
const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
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
    const response = await csrfFetch(`/api/spots/${spotId}`)

    const spot = await response.json();
    dispatch(loadSpots([spot]))
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

export const addSpotImage = (image, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        body: JSON.stringify(image)
    })
    return response
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
        case ADD_SPOT: {
            return {...state, [action.spot.id]: action.spot}
        }
        default:
            return state;
    }
}

export default spotReducer;
