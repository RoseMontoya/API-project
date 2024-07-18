import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSpotImage, editSpot } from "../../store/spot";
import { useNavigate, useParams } from "react-router-dom";
import { loadSpot} from "../../store/spot";
import './SpotForm.css'


const EditSpotPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {spotId} = useParams()
    const spot = useSelector(state => state.spots.currentSpot)

    useEffect(() => {
        if (spotId && !spot) {
            dispatch(loadSpot(spotId))
        }
    }, [dispatch, spotId, spot])


    const [spotDetails, setSpotDetails] = useState({
        country : '',
        address: '',
        city : '',
        state : '',
        lat : '',
        lng : '',
        description : '',
        name : '',
        price : '',
    })

    const [images, setImages] = useState({
        previewImageUrl: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
    })

    const [errors, setErrors] = useState({})
    if (!spot) return null;

    if (!images.previewImageUrl) {
        spot.SpotImages.forEach((image, index) => {
            if (image.preview === true) {
                images.previewImageUrl = image.url
            } else {
                images[`image${index}`] = image.url
            }
        })
    }

    if (!spotDetails.country) {
        setSpotDetails({
            country :spot.country || '',
            address: spot.state || '',
            city : spot.city || '',
            state : spot.state || '',
            lat : spot.lat || '',
            lng : spot.lng || '',
            description : spot.description || '',
            name : spot.name || '',
            price : spot.price || '',
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({})

        const newSpot = {
            address: spotDetails.address,
            city: spotDetails.city,
            state: spotDetails.state,
            country: spotDetails.country,
            lat: spotDetails.lat,
            lng: spotDetails.lng,
            name: spotDetails.name,
            description: spotDetails.description,
            price: spotDetails.price
        }

        const errs = {}
        if (!images.previewImageUrl) errs.previewImageUrl = 'Preview image is required.'

        const newImages = []

        const urlCheck = (url) => {
            const urlSplit = url.split('.')
            const urlEnd = urlSplit[urlSplit.length - 1]
            if (!["png", "jpg", "jpeg"].includes(urlEnd)) {
                return false;
            }
            return true;
        }

        if (urlCheck(images.previewImageUrl)) newImages.push({ url: images.previewImageUrl, preview: true })
        else errs.previewImageUrl = 'Image URL must end in .png, .jpg, or .jpeg'

        if (images.image1) {
            if (urlCheck(images.image1)) newImages.push({ url: images.image1 });
            else errs.image1 = 'Image URL must end in .png, .jpg, or .jpeg'
        }
        if (images.image2) {
            if (urlCheck(images.image2)) newImages.push({ url: images.image2 });
            else errs.image2 = 'Image URL must end in .png, .jpg, or .jpeg'
        }
        if (images.image3) {
            if (urlCheck(images.image3)) newImages.push({ url: images.image3 });
            else errs.image3 = 'Image URL must end in .png, .jpg, or .jpeg'
        }
        if (images.image4) {
            if (urlCheck(images.image4)) newImages.push({ url: images.image4 });
            else errs.image4 = 'Image URL must end in .png, .jpg, or .jpeg'
        }

        dispatch(editSpot(newSpot, spotId))
        .then(res => {
            newImages.map(async image => {
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
        <main id="spot-form">
            <h2>Edit your Spot</h2>
            <form onSubmit={handleSubmit}>
                <h3>Where&apos;s your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <label>
                    <div className="inline">Country
                    {errors?.country && <p className="error" style={{margin: 0}}>{errors?.country}</p>}
                    </div>
                    <input
                        type="text"
                        placeholder="Country"
                        value={spotDetails.country}
                        onChange={(e) => setSpotDetails({...spotDetails,country: e.target.value})}
                        name='country'
                    />
                </label>
                <label>
                    <div className="inline">
                        Street Address
                        {errors?.address && <p className="error">{errors?.address}</p>}
                    </div>
                    <input
                        type="text"
                        placeholder="Address"
                        value={spotDetails.address}
                        onChange={(e) => setSpotDetails({...spotDetails,address: e.target.value })}
                        name='address'
                    />
                </label>
                <div className="next-to-eachother">
                    <label>
                        <div className="inline">
                            City
                            {errors?.city && <p className="error">{errors?.city}</p>}
                        </div>
                        <input
                            type="text"
                            placeholder="City"
                            style={{minWidth: '20.5em'}}
                            value={spotDetails.city}
                            onChange={(e) => setSpotDetails({...spotDetails,city: e.target.value })}
                            name='city'
                        />
                    </label>
                    <span className="comma">,</span>
                    <label>
                        <div className="inline">
                            State
                            {errors?.state && <p className="error">{errors?.state}</p>}
                        </div>
                        <input
                            type="text"
                            placeholder="STATE"
                            style={{maxWidth: '11em'}}
                            value={spotDetails.state}
                            onChange={(e) => setSpotDetails({...spotDetails, state: e.target.value })}
                            name='state'
                        />
                    </label>
                </div>
                <div className="next-to-eachother">
                    <label style={{maxWidth: '20em'}}>
                        <div className="inline">
                            Latitude
                            {errors?.lat && <p className="error">{errors?.lat}</p>}
                        </div>
                        <input
                            type="text"
                            style={{maxWidth: '16em'}}
                            placeholder="Latitude"
                            value={spotDetails.lat}
                            onChange={(e) => setSpotDetails({...spotDetails, lat: e.target.value })}
                            name='latitude'
                        />
                    </label>
                    <span className="comma">,</span>
                    <label>
                        <div className="inline">
                            Longitude
                            {errors?.lng && <p className="error">{errors?.lng}</p>}
                        </div>
                        <input
                            type="text"
                            placeholder="Longitude"
                            value={spotDetails.lng}
                            onChange={(e) => setSpotDetails({...spotDetails, lng: e.target.value })}
                            name='longitude'
                        />
                    </label>
                </div>

                <hr></hr>

                <div id="second-part-of-form">
                    <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea
                        rows='10'
                        placeholder="Description"
                        value={spotDetails.description}
                        onChange={(e) => setSpotDetails({...spotDetails, description: e.target.value })}
                        name='description'
                    />
                    {errors?.description && <p className="error">Description needs a minimum of 30 characters</p>}
                    <hr></hr>
                    <h3>Create a title for your spot</h3>
                    <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                    <input
                        type="text"
                        placeholder="Name of your spot"
                        value={spotDetails.name}
                        onChange={(e) => setSpotDetails({...spotDetails, name: e.target.value })}
                        name='name'
                    />
                    {errors?.name && <p className="error">{errors?.name}</p>}
                    <hr></hr>
                    <h3>Set a base price for your spot</h3>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <div className="inline">
                        <span
                            style={{
                                paddingTop: '.5em',
                                fontSize: '18px'
                            }}
                        >$</span>
                        <input
                            type="text"
                            placeholder="Price per night (USD)"
                            value={spotDetails.price}
                            onChange={(e) => setSpotDetails({...spotDetails, price: e.target.value })}
                            name='price'
                        />
                    </div>
                        {errors?.price && <p className="error">{errors?.price}</p>}
                    <hr></hr>
                    <h3>Liven up your spot with photos</h3>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <div id="image-inputs">
                        <input
                            type="text"
                            placeholder="Preview Image URL"
                            value={images.previewImageUrl}
                            onChange={(e) => setImages({...images, previewImageUrl: e.target.value})}
                            name='previewImageUrl'
                        />
                        {errors?.previewImageUrl && <p className="error">{errors?.previewImageUrl}</p>}
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={images.image1}
                            onChange={(e) => setImages({...images, image1: e.target.value})}
                            name='image1'
                        />
                        {errors?.image1 && <p className="error">{errors.image1}</p>}
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={images.image2}
                            onChange={(e) => setImages({...images, image2: e.target.value})}
                            name='image2'
                        />
                        {errors?.image2 && <p className="error">{errors.image2}</p>}
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={images.image3}
                            onChange={(e) => setImages({...images, image3: e.target.value})}
                            name='image3'
                        />
                        {errors?.image3 && <p className="error">{errors.image3}</p>}
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={images.image4}
                            onChange={(e) => setImages({...images, image4: e.target.value})}
                            name='image4'
                        />
                        {errors?.image4 && <p className="error">{errors.image4}</p>}
                        <hr></hr>
                    </div>
                    <button className="form-button" type="sumbit">Update Your Spot</button>
                </div>

            </form>
        </main>
    )
}

export default EditSpotPage
