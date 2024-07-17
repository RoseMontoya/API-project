import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSpotImage, createSpot, editSpot } from "../../store/spot";
import { useNavigate, useParams } from "react-router-dom";
import { loadSpot} from "../../store/spot";


const SpotFormPage = ({formType}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {spotId} = useParams()
    const spot = useSelector(state => {
        if (spotId && state.spots.spots) return state.spots.spots[spotId]
    })

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
    // console.log(spotDetails)
    const images = [];
    if (spot?.SpotImages) {
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                images.unshift(image.url)
            } else {
                images.push(image.url)
            }
        })
    }

    const [imageUrls, setImageUrls] = useState({
        previewImageUrl : '',
        image1: '',
        image2: '',
        image3: '',
        image4: ''
    })

    useEffect(() => {
        if (spotId && !spot) {
            dispatch(loadSpot(spotId))
        } else if (spot) {
            setSpotDetails({
                country :spot?.country,
                address: spot?.state ,
                city : spot?.city,
                state : spot?.state,
                lat : spot?.lat ,
                lng : spot?.lng ,
                description : spot?.description,
                name : spot?.name,
                price : spot?.price,
            })
            setImageUrls({
                previewImageUrl : images[0],
                image1: images[1],
                image2: images[2],
                image3: images[3],
                image4: images[4]
            })
        }
    }, [dispatch, spotId, spot])

    const [errors, setErrors] = useState({})

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
        if (!imageUrls.previewImageUrl) errs.previewImageUrl = 'Preview image is required.'

        const images = [{ url: imageUrls.previewImageUrl, preview: true }]

        const urlCheck = (url) => {
            const urlSplit = url.split('.')
            const urlEnd = urlSplit[urlSplit.length - 1]
            if (!["png", "jpg", "jpeg"].includes(urlEnd)) {
                return false;
            }
            return true;
        }

        if (imageUrls.image1) {
            if (urlCheck(imageUrls.image1)) images.push({ url: imageUrls.image1 });
            else errs.image1 = 'Image URL must end in .png, .jpg, or .jpeg'
        }
        if (imageUrls.image2) {
            if (urlCheck(imageUrls.image2)) images.push({ url: imageUrls.image2 });
            else errs.image2 = 'Image URL must end in .png, .jpg, or .jpeg'
        }
        if (imageUrls.image3) {
            if (urlCheck(imageUrls.image3)) images.push({ url: imageUrls.image3 });
            else errs.image3 = 'Image URL must end in .png, .jpg, or .jpeg'
        }
        if (imageUrls.image4) {
            if (urlCheck(imageUrls.image4)) images.push({ url: imageUrls.image4 });
            else errs.image4 = 'Image URL must end in .png, .jpg, or .jpeg'
        }

        if (formType === 'Create') {
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
        } else {
            dispatch(editSpot(newSpot, spotId))
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
    }

    const demoSpot = () => {
        setSpotDetails({
            "address": "5 Winter Palace",
            "city": "Val Royeaux",
            "state": "Orlais",
            "country": "Thedas",
            "lat": 45.5088,
            "lng": -73.554,
            "name": "Orlesian Splendor",
            "description": "Exquisite palace apartment with views of the Fountain Courtyard in Val Royeaux",
            "price": 500
        })
        setImageUrls({previewImageUrl : 'https://i.quotev.com/o7dxwda3ssma.jpg'})
    }

    return (
        <main>
            {formType === 'Create'? <>
            <h2>Create New Spot</h2>
            <h3 onClick={() => demoSpot()}>Demo Spot</h3>
            </> : <h2>Edit your Spot</h2>}

            <form onSubmit={handleSubmit}>

                <h3>Where&apos;s your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <label>
                    Country
                    {errors?.country && <p className="error">{errors?.country}</p>}
                    <input
                        type="text"
                        placeholder="Country"
                        value={spotDetails.country}
                        onChange={(e) => setSpotDetails({...spotDetails,country: e.target.value})}
                        name='country'
                    />
                </label>
                <label>
                    Street Address
                    {errors?.address && <p className="error">{errors?.address}</p>}
                    <input
                        type="text"
                        placeholder="Address"
                        value={spotDetails.address}
                        onChange={(e) => setSpotDetails({...spotDetails,address: e.target.value })}
                        name='address'
                    />
                </label>
                <label>
                    City
                    {errors?.city && <p className="error">{errors?.city}</p>}
                    <input
                        type="text"
                        placeholder="City"
                        value={spotDetails.city}
                        onChange={(e) => setSpotDetails({...spotDetails,city: e.target.value })}
                        name='city'
                    />,
                </label>
                <label>
                    State
                    {errors?.state && <p className="error">{errors?.state}</p>}
                    <input
                        type="text"
                        placeholder="STATE"
                        value={spotDetails.state}
                        onChange={(e) => setSpotDetails({...spotDetails, state: e.target.value })}
                        name='state'
                    />
                </label>
                <label>
                    Latitude
                    {errors?.lat && <p className="error">{errors?.lat}</p>}
                    <input
                        type="text"
                        placeholder="Latitude"
                        value={spotDetails.lat}
                        onChange={(e) => setSpotDetails({...spotDetails, lat: e.target.value })}
                        name='latitude'
                    />
                </label>
                <label>
                    Longitude
                    {errors?.lng && <p className="error">{errors?.lng}</p>}
                    <input
                        type="text"
                        placeholder="Longitude"
                        value={spotDetails.lng}
                        onChange={(e) => setSpotDetails({...spotDetails, lng: e.target.value })}
                        name='longitude'
                    />
                </label>

                <hr></hr>

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
                $<input
                    type="text"
                    placeholder="Price per night (USD)"
                    value={spotDetails.price}
                    onChange={(e) => setSpotDetails({...spotDetails, price: e.target.value })}
                    name='price'
                />
                {errors?.price && <p className="error">{errors?.price}</p>}

                <hr></hr>

                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <input
                    type="text"
                    placeholder="Preview Image URL"
                    value={imageUrls.previewImageUrl}
                    onChange={(e) => setImageUrls({...imageUrls, previewImageUrl: e.target.value})}
                    name='previewImageUrl'
                />
                {errors?.previewImageUrl && <p className="error">{errors?.previewImageUrl}</p>}
                <input
                    type="text"
                    placeholder="Image URL"
                    value={imageUrls.image1}
                    onChange={(e) => setImageUrls({...imageUrls, image1: e.target.value})}
                    name='image1'
                />
                {errors?.image1 && <p className="error">{errors.image1}</p>}
                <input
                    type="text"
                    placeholder="Image URL"
                    value={imageUrls.image2}
                    onChange={(e) => setImageUrls({...imageUrls, image2: e.target.value})}
                    name='image2'
                />
                {errors?.image2 && <p className="error">{errors.image2}</p>}
                <input
                    type="text"
                    placeholder="Image URL"
                    value={imageUrls.image3}
                    onChange={(e) => setImageUrls({...imageUrls, image3: e.target.value})}
                    name='image3'
                />
                {errors?.image3 && <p className="error">{errors.image3}</p>}
                <input
                    type="text"
                    placeholder="Image URL"
                    value={imageUrls.image4}
                    onChange={(e) => setImageUrls({...imageUrls, image4: e.target.value})}
                    name='image4'
                />
                {errors?.image4 && <p className="error">{errors.image4}</p>}

                <hr></hr>
                {formType === 'Create'? <button type="sumbit">Create Spot</button> : <button type="sumbit">Update Your Spot</button>}

            </form>
        </main>
    )
}

export default SpotFormPage;
