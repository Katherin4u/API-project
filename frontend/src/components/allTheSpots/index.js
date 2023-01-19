import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllSpotsThunk } from "../../store/spots";
import './allSpots.css'

const AllSpots = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const stateSpot = useSelector((state) => state.spots.allSpots)
    console.log(stateSpot)
    const spots = Object.values(stateSpot)
    
    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])
    
    const spotClick = (e, id) => {
        e.preventDefault();
        history.push(`/spots/${id}`)
    }

    function randomNumber(max, min) {
        return Math.floor(Math.random() * (max - min) + min) * 100;
      }
      
    return (
        <div className="main-spot-Container">
            {spots.map((spot) => (
                <div className="single-spot" onClick={(e) => spotClick(e, spot.id)} key={spot.id}>
                    <div className="spot-image">
                        <img className="image" src={spot.previewImage} alt={`spot#${spot.id}`} />
                    </div>
                    <div className="information-box">
                        <div className="info">
                            <div className="location">
                                <span className="spots-name" key={spot.id}>
                                    {spot.city.length + spot.state.length > 50 ? spot.state : `${spot.city}, ${spot.state}`}
                                </span>
                            </div>
                            <div className="distance-away">
                             {`${randomNumber(spot.id, 1)} miles away`}
                            </div>
                            <div key={spot.id}>
                                <b>${spot.price}</b> night
                            </div>
                        </div>
                        <div className="rating">
                            <span className="spot-rating" key={spot.id}>
                                <i className="star">{spot.avgRating}</i>
                            </span>

                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default AllSpots;