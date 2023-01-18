import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { detailedSpotThunk } from '../../store/spots';
import './singleSpot.css'

const SingleSpot = () => {
    const spot = useSelector((state) => state.spots.singleSpot)
    const user = useSelector((state) => state.session)
    const dispatch = useDispatch();
    const { spotId } = useParams();

    useEffect(() => {
        dispatch(detailedSpotThunk(spotId))
    }, [dispatch, spotId])

const spotImage = spot.SpotImages && spot.SpotImages.length > 0

    return (
        <div className='main-container'>
            <div className='spot-name'>{spot.name}</div>
            <div className='spot-address'>
                <div className='info'>
                    <div className='rating-ontop'>
                        <i className='star-icon'></i>{spot.avgStarRating}
                    </div>
                    <div>{spot.numReview} Reviews</div>
                    <div>{spot.reviews}</div>
                    <div>{spot.address}</div>
                    <div>{spot.city}</div>
                    <div>{spot.state}</div>
                    <div>{spot.country}</div>
                </div>
            </div>
            {spotImage && (
                <div className='images-div'>

                </div>
            )}
        </div>
        
    )
}

export default SingleSpot;