import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSpotImage, createSpot } from "../../store/spot";
import { useNavigate } from "react-router-dom";

const SpotFormPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const [previewImageUrl, setPreviewImageUrl] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');

    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({})

        const newSpot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }

        const errs = {}
        if (!previewImageUrl) errs.previewImageUrl = 'Preview image is required.'

        const images = [{ url: previewImageUrl, preview: true }]

        const urlCheck = (url) => {
            const urlEnd = url.split('.')[1]
            if (!["png", "jpg", "jpeg"].includes(urlEnd)) {
                return false;
            }
            return true;
        }

        if (image1) {
            if (urlCheck(image1)) images.push({ url: image1 });
            else errs.image1 = 'Image URL must end in .png, .jpg, or .jpeg'
        }
        if (image2) {
            if (urlCheck(image2)) images.push({ url: image2 });
            else errs.image2 = 'Image URL must end in .png, .jpg, or .jpeg'
        }
        if (image3) {
            if (urlCheck(image3)) images.push({ url: image3 });
            else errs.image3 = 'Image URL must end in .png, .jpg, or .jpeg'
        }
        if (image4) {
            if (urlCheck(image4)) images.push({ url: image4 });
            else errs.image4 = 'Image URL must end in .png, .jpg, or .jpeg'
        }

        dispatch(createSpot(newSpot))
            .then(res => {
                images.map(async image => {
                    dispatch(addSpotImage(image, res.id))
                })
                return res;
            })
            .then(res => {
                navigate(`/spots/${res.id}`);
            })
            .catch(async err => {
                const data = await err.json();
                const newErrors = {...errs, ...data.errors}
                setErrors(newErrors)
            })
    }

    return (
        <main>
            <h2>Create New Spot</h2>
            <form onSubmit={handleSubmit}>

                <h3>Where's your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <label>
                    Country
                    {errors?.country && <p className="error">{errors?.country}</p>}
                    <input
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        name='country'
                    />
                </label>
                <label>
                    Street Address
                    {errors?.address && <p className="error">{errors?.address}</p>}
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        name='address'
                    />
                </label>
                <label>
                    City
                    {errors?.city && <p className="error">{errors?.city}</p>}
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        name='city'
                    />,
                </label>
                <label>
                    State
                    {errors?.state && <p className="error">{errors?.state}</p>}
                    <input
                        type="text"
                        placeholder="STATE"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        name='state'
                    />
                </label>
                <label>
                    Latitude
                    {errors?.lat && <p className="error">{errors?.lat}</p>}
                    <input
                        type="text"
                        placeholder="Latitude"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        name='latitude'
                    />
                </label>
                <label>
                    Longitude
                    {errors?.lng && <p className="error">{errors?.lng}</p>}
                    <input
                        type="text"
                        placeholder="Longitude"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        name='longitude'
                    />
                </label>

                <hr></hr>

                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea
                    rows='10'
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name='description'
                />
                {errors?.description && <p className="error">Description needs a minimum of 30 characters</p>}

                <hr></hr>

                <h3>Create a title for your spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <input
                    type="text"
                    placeholder="Name of your spot"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name='name'
                />
                {errors?.name && <p className="error">{errors?.name}</p>}

                <hr></hr>

                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                $<input
                    type="text"
                    placeholder="Price per night (USD)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    name='price'
                />
                {errors?.price && <p className="error">{errors?.price}</p>}

                <hr></hr>

                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <input
                    type="text"
                    placeholder="Preview Image URL"
                    value={previewImageUrl}
                    onChange={(e) => setPreviewImageUrl(e.target.value)}
                    name='previewImageUrl'
                />
                {errors?.previewImageUrl && <p className="error">{errors?.previewImageUrl}</p>}
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image1}
                    onChange={(e) => setImage1(e.target.value)}
                    name='image1'
                />
                {errors?.image1 && <p className="error">{errors.image1}</p>}
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image2}
                    onChange={(e) => setImage2(e.target.value)}
                    name='image2'
                />
                {errors?.image2 && <p className="error">{errors.image2}</p>}
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image3}
                    onChange={(e) => setImage3(e.target.value)}
                    name='image3'
                />
                {errors?.image3 && <p className="error">{errors.image3}</p>}
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image4}
                    onChange={(e) => setImage4(e.target.value)}
                    name='image4'
                />
                {errors?.image4 && <p className="error">{errors.image4}</p>}

                <hr></hr>
                <button type="sumbit">Create Button</button>

            </form>
        </main>
    )
}

export default SpotFormPage;
