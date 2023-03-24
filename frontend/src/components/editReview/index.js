// import e from "express"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { allTheReviews, allTheReviewsThunk, editReviewThunk } from "../../store/reviews"
import { detailedSpotThunk } from "../../store/spots"


const EditReview = ({ props }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { spotId } = useParams()
    const [review, setReview] = useState(props.singleReview)
    const [stars, setStars] = useState(1);
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
        <div>
            <button onClick={openMenu}>
                Edit
            </button>
            <div>
                <ul className={ulClassName} ref={ulRef}>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input
                                className="edit-review"
                                id="review"
                                type='text'
                                name='review'
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />

                            <select onChange={(e) => setStars(e.target.value)}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                        </label>
                        <div>
                            <button type="submit">submit</button>
                        </div>
                    </form>
                </ul>
            </div>
        </div>
    )
}

export default EditReview