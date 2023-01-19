import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { editSpotThunk } from "../../store/spots";
import { useHistory, useParams } from "react-router-dom";



const EditSpotModal = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {spotId} = useParams()
 

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errorValidation, setErrorValidation] = useState([])
    const user = useSelector((state) => state.session);
    const spot = useSelector((state) => state.spots.singleSpot)
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editSpot = {
            ownerId: user.id,
            name,
            address,
            city,
            state,
            country,
            description,
            price,
            lat: 384.03,
            lng: 100.11,
        }

     const thunk = dispatch(editSpotThunk(editSpot, spot.id))
        
        if(thunk){
            history.push(`/spots/${spotId}`)
        }

    }

    useEffect(() => {
        const errors = []
        if (name.length === 0) errors.push('Name must be less than 50 characters')
        if (address.length === 0) errors.push('Street address is required')
        if (city.length === 0) errors.push('City is required')
        if (state.length === 0) errors.push('State is required')
        if (country.length === 0) errors.push('Country is required')
        if (price <= 0) errors.push('Price per day is required')
        if (description.length === 0) errors.push('Description is required')

        setErrorValidation(errors)
    }, [name, address, city, state, country, price, description])

    useEffect(() => {
        if (Object.keys(spot).length > 0) {
            const { name, address, city, state, country, price, description } = spot
            setName(name);
            setAddress(address)
            setCity(city)
            setState(state)
            setCountry(country)
            setPrice(price)
            setDescription(description)
        }
    }, [spot])

    return (
        <div>
            <h1 className="editSpot-Introduction">Edit your spot!</h1>
            <div id='editSpot-container'>
                {handleSubmit && errorValidation.length > 0 && (
                    <div className="editSpot-info">
                        <ul className="errors">
                            {errorValidation.map((error) => {
                                return <li key={error}>{error}</li>
                            })}
                        </ul>
                    </div>
                )}

                <form className="editSpot-inputs" onSubmit={handleSubmit}>
                    <input
                        className="editSpot-name"
                        type='text'
                        value={name}
                        placeHolder='Edit Name'
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="editSpot-address"
                        type='text'
                        value={address}
                        placeHolder='Edit Address'
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                        className="editSpot-city"
                        type='text'
                        value={city}
                        placeHolder='Edit City'
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                        className="editSpot-state"
                        type='text'
                        value={state}
                        placeHolder='Edit State'
                        onChange={(e) => setState(e.target.value)}
                    />
                    <input
                        className="editSpot-country"
                        type='text'
                        value={country}
                        placeHolder='Edit Country'
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <input
                        className="editSpot-description"
                        type='text'
                        value={description}
                        placeHolder='Edit Description'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        className="editSpot-price"
                        type='text'
                        placeHolder='Edit Price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <div className="editSpot-button">
                        <button className="editSpot-submit-button" type='submit' disabled={errorValidation.length > 0}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditSpotModal;