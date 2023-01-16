import { csrfFetch } from './csrf'

const CREATE_SPOT = 'spots/create_spot'


export const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
})


export const createSpotThunk = (data) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        const spot = await response.json();
        dispatch(createSpot(spot))
        return spot
    }
}

const initialState = {
    allSpots: {},
    singleSpot: {}
}


export default function spotReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_SPOT:
            return { ...state, [action.spot.id]: action.spot }
        default:
            return state;
    }
}