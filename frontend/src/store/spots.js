import { csrfFetch } from './csrf'

const CREATE_SPOT = 'spots/create_spot'
const SPOT_IMAGE = 'spots/spot_Image'


export const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
})

export const spotImage = (image) => ({
    type: SPOT_IMAGE,
    image
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

export const addSpotImageThunk = (data, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(spotImage(data))
        return data
    }
}

export const editSpotThunk = (data, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method:'PUT',
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if(response.ok){
        const data = await response.json()
        dispatch(createSpot(data))
        return data
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
        case SPOT_IMAGE:
            return {...state, [action.image.id]: {...action.image, previewImage:action.image.url}}
        default:
            return state;
    }
}