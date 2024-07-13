import { csrfFetch } from "./csrf";

const SET_CURRENT_USER = '/store/session/SET_CURRENT_USER';
const REMOVE_USER = '/store/session/REMOVE_USER';

// Actions
const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

const removeUser = (user) => {
    return {
        type: REMOVE_USER,
        user
    }
}

// Thunks
export const login = (user) => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });

    const data = await response.json()
    if (response.ok) {
        dispatch(setCurrentUser(data));
        return data
    }
    throw {...data, status: response.status}
}

// Reducer
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER: {
            return {...state, ...action.user};
        }
        case REMOVE_USER: {
            return {...state, user: null };
        }
        default:
            return state;
    }
};

export default sessionReducer;
