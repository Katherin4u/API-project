import { cloneElement, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { detailedSpotThunk, editSpotThunk } from "../../store/spots";
import { useHistory, useParams } from "react-router-dom";
import '../CreateASpot/createSpot.css'


const EditSpotModal = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { spotId } = useParams()
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

    const submitChanges = async (e) => {
        e.preventDefault();

        if (errorValidation.length > 0) {
            return;
        };

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

        if (thunk) {
            history.push(`/spots/${spotId}`)
        }

    }

    // handles the setting of the form variables when editing
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
    }, [dispatch, spotId, spot])

    // handles getting teh spot information for Edit form
    useEffect(() => {
        dispatch(detailedSpotThunk(spotId))
    }, [])

    // sets spot names to 
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

    if (!spot.id) return null;

    return (
        <div style={{ alignItems: "center", display: 'flex', flexDirection: 'column' }}>
            <h1 className="editSpot-Introduction">Edit your spot!</h1>
            <div id='editSpot-container'>
            </div>
            <div className="create-spot-main-div" style={{ width: '600px' }}>

                <div className="Spot-creation" style={{ border: 'black solid 2px', padding: '20px', borderRadius: '15px' }}>
                    {errorValidation.length > 0 && (
                        <div className="editSpot-info">
                            <ul className="errors">
                                {errorValidation.map((error) => {
                                    return <li key={error}>{error}</li>
                                })}
                            </ul>
                        </div>
                    )}

                    <div id="client-info">
                        <form className="spot-form-submit" onSubmit={submitChanges}>
                            <div className="input-box">
                                <div className='name-before-input'>
                                    <label for="name" className="title-label" id="name-label">Edit Name</label>
                                </div>
                                {/* <label for="name" className="title-label" id="name-label">Edit Name</label> */}
                                <input className="createSpot-name-input"
                                    type='text'
                                    value={name}
                                    placeholder='Edit Name'
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="input-box">
                                {/* <label for="email" className="title-label" id="email-label">Edit Address</label> */}
                                <div className='name-before-input'>
                                    <label for="Address" className="title-label" id="address-label">Edit Address</label>
                                </div>
                                <input className="createSpot-address-input"
                                    type='text'
                                    value={address}
                                    placeholder='Edit Address'
                                    onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="input-box">
                                {/* <label for="number" className="title-label" id="number-label">Edit City</label> */}
                                <div className='name-before-input'>
                                    <label for="number" className="title-label" id="number-label">Edit City</label>

                                </div>
                                <input className="createSpot-city-input"
                                    type='text'
                                    value={city}
                                    placeholder='Edit City'
                                    onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div className="input-box">
                                {/* <label for="number" className="title-label" id="number-label">Edit State</label> */}
                                <div className='name-before-input'>
                                    <label for="number" className="title-label" id="number-label">Edit State</label>

                                </div>
                                <input
                                    className="createSpot-state-input"
                                    type='text'
                                    value={state}
                                    placeholder='Edit State'
                                    onChange={(e) => setState(e.target.value)} />
                            </div>
                            <div className="input-box">
                                {/* <label for="number" className="title-label" id="number-label">Edit Country</label> */}
                                <div className='name-before-input'>
                                    <label for="number" className="title-label" id="number-label">Edit Country</label>

                                </div>
                                <input
                                    className="createSpot-country-input"
                                    type='text'
                                    value={country}
                                    placeholder='Edit Country'
                                    onChange={(e) => setCountry(e.target.value)} />
                            </div>
                            <div className="input-box">
                                {/* <label for="number" className="title-label" id="number-label">Edit Description</label> */}
                                <div className='name-before-input'>
                                    <label for="number" className="title-label" id="number-label">Edit Description</label>

                                </div>
                                <input
                                    className="createSpot-description-input"
                                    type='text'
                                    value={description}
                                    placeholder='Edit Description'
                                    onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="input-box">
                                {/* <label for="number" className="title-label" id="number-label">Edit Price</label> */}
                                <div className='name-before-input'>
                                    <label for="number" className="title-label" id="number-label">Edit Price</label>
                                </div>
                                <input className="createSpot-price-input"
                                    type='text'
                                    placeholder='Edit Price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className="editSpot-button">
                                <button className="editSpot-submit-button" type='submit' disabled={errorValidation.length > 0}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditSpotModal;