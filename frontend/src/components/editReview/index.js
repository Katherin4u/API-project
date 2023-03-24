// import e from "express"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { allTheReviews, allTheReviewsThunk, editReviewThunk } from "../../store/reviews"
import { detailedSpotThunk } from "../../store/spots"
import './editReview.css'


const EditReview = ({ props }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const spot = useSelector((state) => state.spots.singleSpot)
    const { spotId } = useParams()
    const [review, setReview] = useState(props.singleReview)
    const [stars, setStars] = useState(spot.avgStarRating);
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((state) => state.session)
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            review,
            stars
        }
        if (!user) return null

        await dispatch(editReviewThunk(props.id, data))
            .then(() => {
                dispatch(allTheReviewsThunk(spotId))
                dispatch(detailedSpotThunk(spotId))
            })

        // history.push(`/spots/${spotId}`)
        closeMenu()
    }




    return (
        <div className="div-for-edit">
            <div>
            <button  className="button-edit-comment" onClick={openMenu}>
                Edit
            </button>
            </div>
            <div className="nav-bar-dropdown-menu-container1">
                <div className="nav-bar-dropdown-menu1">
                    <ul className={ulClassName} ref={ulRef}>
                        <form className='inside-dropdown3' onSubmit={handleSubmit}>
                            <label>
                                <input
                                    className="edit-review"
                                    id="review"
                                    type='text'
                                    name='review'
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                />

                                <select className="select-container" onChange={(e) => setStars(e.target.value)}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                            </label>
                            <div className="edit-review-submit-button-container">
                                <button className="edit-form-submit-button"  type="submit">submit</button>
                            </div>
                        </form>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default EditReview