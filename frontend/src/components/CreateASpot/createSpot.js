import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpotThunk, addSpotImageThunk } from "../../store/spots";
import './createSpot.css'

export default function CreateSpotModal() {

    // all variables 
    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setpreviewImage] = useState('');
    const [description, setDescription] = useState('');
    const [errorValidations, setErrorValidations] = useState([]);
    const user = useSelector((state) => state.session.user);

    const submit = async (e) => {
        e.preventDefault();

        if (!user) {
            return;
        }

        if (errorValidations.length > 0) {
            setSubmitted(true)
            return;
        };

        const spot = {
            ownerId: user,
            name,
            address,
            city,
            state,
            country,
            price,
            previewImage,
            description,
            lat: 120.2352,
            lng: 111.3521,
        }

        let createdSpot = await dispatch(createSpotThunk(spot));
        if (createdSpot && previewImage) {
            const image = {
                url: previewImage,
                preview: true,
            };
            await dispatch(addSpotImageThunk(image, createdSpot.id));
        }
        const id = createdSpot.id;
        history.push(`/spots/${id}`);


    }

    const close = (e) => {
        e.preventDefault();
        history.push('/spots')
    }

    useEffect(() => {
        const errors = []
        if (name.length === 0) errors.push('Name must be less than 50 characters');
        if (address.length === 0) errors.push('Street address is required')
        if (city.length === 0) errors.push('City is required')
        if (state.length === 0) errors.push('State is required')
        if (previewImage.length === 0) errors.push('Must enter an image URL')
        if (country.length === 0) errors.push('Country is required')
        if (price <= 0) errors.push('Price per day is required')
        if (description.length === 0) errors.push('Description is required')
        setErrorValidations(errors)
    }, [name, address, city, state, country, price, description])



    return (
        <div className="div">

        <div className="create-spot-main-div" >
            {user ? (<h1 className="Introduction">Create A Spot!</h1>) : (<h1 className="Introduction">
                Log in to create a Spot!</h1>)}
            <div className="Spot-creation">
                <div id="client-info">
                    <form className="spot-form-submit" onSubmit={submit} style={{ border: 'black solid 2px', padding: '20px', borderRadius: '15px' }}>
                        <div className="errors-div">

                        <ul className="errors-input">
                            {submitted && errorValidations.map((error) => {
                                return <li key={error}>{error}</li>
                            })}
                        </ul>
                        </div>
                        <div className="input-box">
                            <div className='name-before-input'>
                                <label for="name" className="title-label" id="name-label">Name</label>
                            </div>

                            <input className="createSpot-name-input"
                                maxLength={50}
                                type='text'
                                value={name}
                                placeholder='Spot Name'
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <div className='name-before-input'>
                                <label for="Address" className="title-label" id="address-label">Address</label>
                            </div>

                            <input className="createSpot-address-input"
                                type='text'
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <div className='name-before-input'>
                                <label for="number" className="title-label" id="number-label">City</label>

                            </div>

                            <input className="createSpot-city-input"
                                type='text'
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <div className='name-before-input'>
                                <label for="number" className="title-label" id="number-label">State</label>

                            </div>

                            <input
                                className="createSpot-state-input"
                                type='text'
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <div className='name-before-input'>
                                <label for="number" className="title-label" id="number-label">Country</label>

                            </div>
                            <input
                                className="createSpot-country-input"
                                type='text'
                                placeholder="Country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <div className='name-before-input'>
                                <label for="number" className="title-label" id="number-label">Image</label>

                            </div>
                            <input
                                className="createSpot-previewImage-input"
                                type='url'
                                placeholder="Image URL"
                                value={previewImage}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setpreviewImage(e.target.value)
                                }} />
                        </div>
                        <div className="input-box">
                            <div className='name-before-input'>
                                <label for="number" className="title-label" id="number-label">Price</label>

                            </div>

                            <input className="createSpot-price-input"
                                type='numeric'
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <div className='name-before-input'>
                                <label for="number" className="title-label" id="number-label">Description</label>

                            </div>

                            <input
                                className="createSpot-description-input"
                                type='text'
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="button-divs">
                            <div className="submit-button">
                                <button type='submit' className='createSpot-submit-button'>
                                    Submit
                                </button>
                            </div>
                            <div className="cancel-button">
                                <button className="creatSpot-canceledit-button" onClick={(e) => close(e)}>
                                    Cancel
                                </button>
                            </div>

                        </div>
                    </form>

                </div>

            </div>
        </div>
        </div>

    )
}
