import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addAReviewThunk, allTheReviewsThunk, deleteReviewThunk } from '../../store/reviews';
import { deleteButtonThunk, detailedSpotThunk } from '../../store/spots';
import './singleSpot.css'

const SingleSpot = () => {
    const history = useHistory();
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots.singleSpot)
    const user = useSelector((state) => state.session)
    const Allreviews = useSelector((state) => state.reviews.allReviews)
    const reviews = Object.values(Allreviews)

    const dispatch = useDispatch();
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(1);
    const [errorValidation, setErrorValidation] = useState([]);


    const submit = async (e) => {
        e.preventDefault()

        if (reviewText === "") {
            setErrorValidation(["Please enter Review"]);
            return;
        }

        if (rating > 5 || rating < 1) {
            setErrorValidation(['Rating should be between 1 and 5'])
        }

        if (errorValidation.length > 0) setErrorValidation([])
        const data = { review: reviewText, stars: rating };
        dispatch(addAReviewThunk(data, spotId))
        dispatch(detailedSpotThunk(spotId))

    }

    useEffect(() => {
        dispatch(detailedSpotThunk(spotId))
        dispatch(allTheReviewsThunk(spotId))
    }, [dispatch, spotId])

    const spotImage = (
        spot.SpotImages && spot.SpotImages.length > 0
    )

    const editButton = (e) => {
        e.preventDefault();
        history.push(`/spots/${spotId}/edit`);
    };

    const deleteButton = (e) => {
        e.preventDefault()
        dispatch(deleteButtonThunk(spotId))
        history.push('/')
    }

    const deleteRevButton = (e, reviewId) => {
        e.preventDefault()
        dispatch(deleteReviewThunk(reviewId))
    }




    if (!spot.id) return null;

    return (
        <div className='main-container-single-spot'>
            <div className='top'>
                <div className='spot-name'>{spot.name}</div>
                <div className='spot-address'>
                    <div className='info'>
                        <div className='rating-ontop'>
                            <i className='fas fa-star star-icon'></i>{spot.avgStarRating}
                        </div>
                        <div className='numReview'>{spot.numReview} Reviews</div>
                        <div>{spot.reviews}</div>
                        <div className='location-underline'>{spot.address}</div>
                        <div className='location-underline'>{spot.city}</div>
                        <div className='location-underline'>{spot.state}</div>
                        <div className='location-underline'>{spot.country}</div>
                    </div>
                    {spot.Owner.id === user.user?.id && (
                        <div className="edit-and-delete-buttons">
                            <div className='top-button'>
                                <button
                                    onClick={(e) => editButton(e)}
                                    className="edit-spot"
                                >
                                    <i className="fa-solid fa-user-pen"></i>
                                </button>
                            </div>
                            <div className='buttom-button'>
                                <button
                                    onClick={(e) => deleteButton(e)} className="spot-edit-delete-button">
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {spotImage && (
                    <div className="spot-images-div">
                        {spot.SpotImages.map((image) => {
                            return (
                                <img key={`image-${image.id}`} className={'single-image'} src={image.url} alt="" />
                            );
                        })}
                    </div>
                )}
            </div>
            <div className='main-buttom-pic-div'>
                <div className='left-div'>
                    <div className='discription-div'>
                        <div className='description-info'>
                            {spot.description}
                        </div>
                        <div className='roomInfo'>
                            <span> 4 guests</span>
                            <span> 3 bedrooms</span>
                            <span> 2 bed</span>
                            <span> 2 bath</span>
                        </div>
                    </div>

                    <div className='extra-words-div'>
                        <div className='selfCheckin-div'>
                            <div className='self-checkin'> Self check-In
                            </div>
                            <span className='span-text'>
                                Check yourself in with the keypad.
                            </span>
                        </div>
                        <div className='user-description-div'>
                            <div className='monica'>
                                Monica is a Superhost

                            </div>
                            <div className='user-description'>
                                <span>
                                    Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                                </span>
                            </div>
                        </div>
                        <div className='location-description-div'>
                            <div className='location-description'>
                                Free cancellation before Feb 21.
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="aircover-title-image">
                            <img src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" />
                        </div>
                        <div className='descripton-checkin'>
                            Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
                        </div>
                        <div className='learn-more'>
                            Learn More
                        </div>
                    </div>
                </div>

                <div className='right-div'>
                    <div className='rating-price'>
                        <div className="price-rating-side-box">
                            <div className="spot-description-price">{`$${spot.price} night`}</div>

                            <div className="spot-details-rating">
                                <i className="fas fa-star rating-color"></i>
                                {!spot.avgStarRating
                                    ? "" : spot.avgStarRating
                                }
                            </div>
                        </div>
                    </div>

                    <form className='add-review' onSubmit={submit}>
                        <h4>Enter Review Here</h4>
                        {errorValidation.length > 0 && (
                            <ul>
                                {errorValidation.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        )}
                        <div className='input-review'>
                            <textarea
                                rows="3"
                                cols="3"
                                placeholder="Enter Review"
                                onChange={(e) => setReviewText(e.target.value)}
                                value={reviewText}
                            ></textarea>
                            <select onChange={(e) => setRating(e.target.value)}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                            <button className='review-submit-button' type='submit'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

            </div>
            <div className='all-reviews-div'>
                <div className='reviewbox-rating-reviews'>
                <div className='buttom-spot-rating'>
                    <i className='fas fa-star star-icon'></i>{spot.avgStarRating}
                </div>
                <div className='numReview-bottom-spot'>{spot.numReview} Reviews</div>

                </div>
                <div className='review-main'>
                    {reviews?.map((rev) => (
                        <div className='main-review-div' key={rev.id}>
                            <div className='user-review-div'>
                                <div className='left-div-review'>
                                    <div className='names-delete-button'>
                                        <div className='first-and-lastname'>
                                            {user.user.firstName}
                                            {user.user.lastName}
                                        </div>
                                        {user.user?.id === rev.userId && (
                                            <div className='review-delete'>
                                                <button
                                                    onClick={(e) => deleteRevButton(e, rev.id)}
                                                    className='button-delete'
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <br></br>
                                    <div className='rating-date'>
                                        <div className='rate-date'>
                                            <div> {rev.createdAt}</div>
                                        </div>
                                        <div className='user-review'>
                                            {rev.review}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>

        </div>
    )
}

export default SingleSpot;