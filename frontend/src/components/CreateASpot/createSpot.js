import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpotThunk, addSpotImageThunk } from "../../store/spots";
import './createSpot.css'


export default function CreateSpot() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState('');
    const [imageurl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [errorValidations, setErrorValidations] = useState([]);
    const user = useSelector((state) => state.session.user);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const spot = {
            ownerId: user,
            name,
            address,
            city,
            state,
            country,
            price,
            imageurl,
            description
        };


        let createdSpot = await dispatch(createSpotThunk(spot));

        if (createdSpot && imageurl) {
            const image = {
                url: imageurl,
                preview: true,
            }


            await dispatch(addSpotImageThunk(image, createdSpot.id))
            const id = createdSpot.id;
            history.push(`/spots/${id}`);
        }

    }

    useEffect(() => {
        const errors = []

        if (name.length === 0) errors.push('Name must be less than 50 characters');
        if (address.length === 0) errors.push('Street address is required')
        if (city.length === 0) errors.push('City is required')
        if (state.length === 0) errors.push('State is required')
        if (country.length === 0) errors.push('Country is required')
        if (price <= 0) errors.push('Price per day is required')
        if (description.length === 0) errors.push('Description is required')

        setErrorValidations(errors)
    }, [name, address, city, state, country, price, description])

    const cancel = (e) => {
        e.preventDefault();
        history.push('/spots')
    }


    return (
        <div style={{ width: '600px' }}>
            <h1 className="Introduction">Create A Spot!</h1>
            <div className="Spot-creation">
                <div id="client-info">
                    <ul className="errors-input">
                        {errorValidations.map((error) => {
                            return <li key={error}>{error}</li>
                        })}
                    </ul>
                    <form className="spot-inputs" onSubmit={handleSubmit}>
                        <input
                            className="createSpot-name-input"
                            maxLength={50}
                            type='text'
                            value={name}
                            placeholder='Spot Name'
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="createSpot-address-input"
                            type='text'
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <input
                            className="createSpot-city-input"
                            type='text'
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <input
                            className="createSpot-state-input"
                            type='text'
                            placeholder="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                        <input
                            className="createSpot-country-input"
                            type='text'
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <input
                            className="createSpot-price-input"
                            type='text'
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <input
                            className="createSpot-imageUrl-input"
                            type='url'
                            placeholder="Image url"
                            value={imageurl}
                            onChange={(e) => {
                                e.preventDefault();
                                setImageUrl(e.target.value)
                            }}
                        />
                        <input
                            className="createSpot-description-input"
                            type='text'
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <div className="createSpot-buttons">
                            <button type='submit' disabled={errorValidations.length > 0} className='createSpot-submit-button'>
                                Submit
                            </button>

                            <button className="creatSpot-canceledit-button" onClick={(e) => cancel(e)}>
                                Cancel
                            </button>
                        </div>
                    </form>

                </div>

            </div>
        </div>

    )
}
