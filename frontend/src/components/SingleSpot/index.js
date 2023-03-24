import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { addAReviewThunk, allTheReviewsThunk, deleteReviewThunk } from '../../store/reviews';
import { deleteButtonThunk, detailedSpotThunk, getAllSpotsThunk } from '../../store/spots';
import EditReview from '../editReview';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import './singleSpot.css'

const SingleSpot = () => {
    const history = useHistory();
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots.singleSpot)
    const user = useSelector((state) => state.session)
    const Allreviews = useSelector((state) => state.reviews.allReviews)
    const reviews = Object.values(Allreviews)
    const dispatch = useDispatch();
    const [keepImage, setKeepImage] = useState(false)
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
        await dispatch(addAReviewThunk(data, spotId))
            .then(() => {
                setReviewText('')
            })
    }

    useEffect(() => {
        dispatch(allTheReviewsThunk(spotId))
        dispatch(detailedSpotThunk(spotId)).then(() => setKeepImage(true))
    }, [dispatch, spotId, reviewText, rating])

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
        dispatch(getAllSpotsThunk())
    }

    const deleteRevButton = async (e, reviewId) => {
        e.preventDefault()
        await dispatch(deleteReviewThunk(reviewId))
            .then(() => {
                dispatch(detailedSpotThunk(spotId))
            })

    }


    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date();
    const monthName = monthNames[date.getMonth()]
    const year = date.getFullYear();
    const currentDate = (`${monthName} ${year}`)

    if (!spot.id) return null;
    if (!keepImage) return null

    const altImg = "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"

    return (
        <div className='main-container-single-spot'>
            <div className='top'>
                <div className='spot-name'>{spot.name}</div>
                <div className='spot-address'>
                    <div className='info'>
                        <div className='rating-ontop'>
                            <i className='fas fa-star star-icon'></i>{spot.avgStarRating ? spot.avgStarRating.toFixed(1) : '0'}
                        </div>
                        <div className='numReview'>{reviews.length} Reviews</div>
                        <div>{spot.reviews}</div>
                        ·
                        <div className='location-underline'>{spot.address}</div>
                        ·
                        <div className='location-underline'>{spot.city}, {spot.state}, {spot.country}</div>
                        {/* <div className='location-underline'>{spot.state}</div>
                        <div className='location-underline'>{spot.country}</div> */}
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
                <div className="spot-images-div">
                    <img className="single-image" onError={e => { e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/800px-No-Image-Placeholder.svg.png"; }} src={spotImage ? spot.SpotImages[0].url : altImg} alt={spot.id}
                    />
                </div>
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
                                {spot?.Owner.firstName} is a Superhost
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
                    <div className='reviewboxborder'>
                        <div className='rating-price'>
                            <div className="price-rating-side-box">
                                <div className='price-night'>
                                    <div className="spot-description-price">{`$${spot.price}`}</div>
                                    <div className='night'>
                                        night
                                    </div>
                                </div>
                                <div className="spot-details-rating">
                                    <i className="fas fa-star rating-color"></i>
                                    {spot.avgStarRating ? spot.avgStarRating.toFixed(1) : '0'
                                    }
                                    <div className='num-of-reviews'>
                                        <div className='numReview-bottom-spot-2'>{`${reviews.length} Reviews`}</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <form className='add-review' onSubmit={submit}>
                            <h4 className='enter-here'>Enter Review Here</h4>
                            {errorValidation.length > 0 && (
                                <ul>
                                    {errorValidation.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            )}
                            <div className='input-review'>
                                <div className='textarea'>
                                    <textarea
                                        minLength={2}
                                        maxLength={300}
                                        rows="6"
                                        cols="27"
                                        placeholder="Enter Review"
                                        onChange={(e) => setReviewText(e.target.value)}
                                        value={reviewText}
                                    ></textarea>
                                </div>
                                <div className='select'>
                                    <div className='select-rating'> Select Rating</div>
                                    <select onChange={(e) => setRating(e.target.value)}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select>

                                </div>
                            </div>
                            {user.user && (
                                <div className='button-padding'>
                                    <button className='review-submit-button' type='submit'>
                                        Submit
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>

            </div>
            <div className='all-reviews-div'>
                <div className='reviewbox-rating-reviews'>
                    <div className='buttom-spot-rating'>
                        <i className='fas fa-star star-icon'></i>{spot.avgStarRating ? spot.avgStarRating.toFixed(1) : '0'}
                    </div>
                    <div className='numReview-bottom-spot'>{reviews.length} Reviews</div>

                </div>
                <div className='review-main'>
                    {reviews?.map((rev) => (
                        <div className='main-review-div' key={rev.id}>
                            <div className='user-review-div'>
                                <div className='left-div-review'>
                                    <div className='names-delete-button'>
                                        {user.user?.id === rev.userId && (
                                            <div className='review-delete'>

                                                <div className='edit-and-delete'>
                                                    <div className='editRev-div'>
                                                        <EditReview props={{ id: rev.id, singleReview: rev.review }} />
                                                    </div>
                                                    <button
                                                        onClick={(e) => deleteRevButton(e, rev.id)}
                                                        className='button-delete'
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                        <div className='first-and-lastname'>
                                            <div className='firstname-lastname-font'>
                                                <i className="fas fa-user-circle" />
                                                <div className='firstName'>
                                                    {rev.User?.firstName}
                                                </div>
                                                <div className='lastName'>
                                                    {rev.User?.lastName}

                                                </div>
                                            </div>
                                            <div className='two'>
                                                <div className='rate-date'>
                                                    <div> {currentDate}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className='rating-date'>
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