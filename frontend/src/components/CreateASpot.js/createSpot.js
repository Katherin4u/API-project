import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './createSpot.css'


export default function CreateSpot() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState('');
    const [imageurl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [errorValidations, setErrorValidations] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const spot = {
            name,
            address,
            city,
            state,
            country,
            price,
            imageurl,
            description
        }

        history.push(`/spots/${id}`);
    }

    useEffect(() => {
        const errors = []

        if (name.length === 0) errors.push('Please Enter a Valid Name');
        if (address.length === 0) errors.push('Please Enter a Valid Address')
        if (city.length === 0) errors.push('Please Enter a Valid City')
        if (state.length === 0) errors.push('Please Enter a Valid State')
        if (country.length === 0) errors.push('Please Enter a Valid Country')
        if (price <= 0) errors.push('Please Enter a Price')
        if (description.length === 0) errors.push('Please Enter a Description')

        setErrorValidations(errors)
    }, [name, address, city, state, country, price, description])


    return (
        <div>
            <h1 className="Introduction"></h1>
            <div className="Spot-creation">
                <div id="client-info">
                    <ul className="errors-input">
                        {errorValidations.map((error) => {
                            <li key={error}>{error}</li>
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

                        </div>
                    </form>

                </div>

            </div>
        </div>

    )
}
