import { csrfFetch } from "./csrf";

const ADD_REVIEW = "review/add_review"
const ALL_REVIEW = 'review/all_review'
const DELETE_REVIEW ='review/delete_reviews'
const EDIT_REVIEW = 'review/edit_review'
export const addAReview = (review) => ({
    type: ADD_REVIEW,
    review
})

export const allTheReviews = (review) => ({
    type: ALL_REVIEW,
    review
})

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})

export const editReview = (editReview) => {
    return {
        type: EDIT_REVIEW,
        editReview
    }
}

export const addAReviewThunk = (data, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        const review = await response.json()
        dispatch(addAReview(review))
        return review
    }
}

export const allTheReviewsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if(response.ok){
        const reviews = await response.json()
        dispatch(allTheReviews(reviews))
        return reviews
    }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if(response.ok){
        const delReview = await response.json()
        dispatch(deleteReview(reviewId))
        return delReview
    }
}

export const editReviewThunk = (id, data) => async (dispatch) => {
    console.log(id,data)
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    console.log("the response fetch", response)

    if(response.ok){
        const review = await response.json()
        console.log("Im being seen!!!!!!" , review)
        dispatch(editReview(review))
        return review
    }
}


const initialState = {
    allReviews: {}
}

export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_REVIEW:
            return {...state, allReviews:{...state.allReviews, [action.review.id] : action.review}}
        case ALL_REVIEW:
            const allTheReviews = {}
            action.review.Reviews.forEach((review) => {
                allTheReviews[review.id] = review
            })
            return {...state, allReviews: allTheReviews}
        case DELETE_REVIEW:
            const reviewDel = {
                ...state, allReviews:{...state.allReviews}
            }
            delete reviewDel.allReviews[action.reviewId]
            return reviewDel
        case EDIT_REVIEW:
           const newState = {...state}
           newState.allReviews[action.editReview.id] = action.editReview
           return newState
        default:
            return state
    }
}