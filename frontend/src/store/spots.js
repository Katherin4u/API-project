import { csrfFetch } from './csrf'

const CREATE_SPOT = 'spots/create_spot'
const SPOT_IMAGE = 'spots/spot_Image'
const GET_ALL_SPOTS = 'spots/get_all_Spots'


export const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
})

export const spotImage = (image) => ({
    type: SPOT_IMAGE,
    image
})

export const getAllSpots = (spot) => ({
    type: GET_ALL_SPOTS,
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
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(createSpot(data))
        return data
    }
}

export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`)

    if (response.ok) {
        const spots = await response.json()
        dispatch(getAllSpots(spots))
        return spots
    }
}

const initialState = {
    allSpots: {},
    singleSpot: {}
}


export default function spotReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            const allTheSpots = {}
            action.spots.Spots.forEach((spot) => {
                allTheSpots[spot.id] = spot
            })
            return { ...state, allSpots: allTheSpots }
        }
        case CREATE_SPOT:
            return { ...state, [action.spot.id]: action.spot }
        case SPOT_IMAGE:
            return { ...state, [action.image.id]: { ...action.image, previewImage: action.image.url } }
        default:
            return state;
    }
}