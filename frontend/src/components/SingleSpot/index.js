import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteButtonThunk, detailedSpotThunk } from '../../store/spots';
import './singleSpot.css'
import OpenModalButton from '../OpenModalButton';
import EditSpotModal from '../EditSpotModal/editSpot';

const SingleSpot = () => {
    const history = useHistory();
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots.singleSpot)
    const user = useSelector((state) => state.session)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailedSpotThunk(spotId))
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

    if (!spot.id) return null;

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
                {spot.Owner.id === user.user?.id && (
                    <div className="edit-and-delete-buttons">
                        <button
                            onClick={(e) => editButton(e)}
                            className="edit-spot"
                        >
                            <i class="fa-solid fa-user-pen"></i>
                        </button>
                        <button
                            onClick={(e) => deleteButton(e)} className="spot-edit-delete-button">
                            <i class="fa-solid fa-trash"></i>
                        </button>
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

    )
}

export default SingleSpot;