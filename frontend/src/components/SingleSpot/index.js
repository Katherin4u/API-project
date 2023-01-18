import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { detailedSpotThunk } from '../../store/spots';
import './singleSpot.css'

const SingleSpot = () => {
    const spot = useSelector((state) => state.spots.singleSpot)
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
                        <i className='fas fa-star star-icon'></i>{spot.avgStarRating}
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
               <div className="spot-images-div">
               {spot.SpotImages.map((image) => {
                 return (
                     <img key={`image-${image.id}`} className={'single-image'} src={image.url} alt="" />
                 );
               })}
             </div>
            )}

        </div>
        
    )
}

export default SingleSpot;