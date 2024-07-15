import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadSpot } from "../../store/spot";
import { IoMdStar } from "react-icons/io";
import { LuDot } from "react-icons/lu";
import { loadAllReviews } from "../../store/review";

const months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"]

const SpotDetailsPage = () => {
    const dispatch = useDispatch()
    const {spotId }= useParams()
    const spot = useSelector(state => state.spots[spotId])
    const reviews = useSelector(state => Object.values(state.reviews));


    useEffect(() => {
        dispatch(loadSpot(spotId))
        dispatch(loadAllReviews(spotId))
    }, [dispatch, spotId])

    if (!spot || !spot.SpotImages) return null;

    let previewImageUrl;
    const otherImages = [];
    spot.SpotImages.forEach(image => {
        if (image.preview === true) {
            previewImageUrl = image.url;
        } else {
            otherImages.push(image)
        }

    })

    const formatReviewDate = (date) => {
        const dateSplit = date.split('-')
        const month = Number(dateSplit[1])
        const year = dateSplit[0]
        return `${months[month]} ${year}`
    }

    const handleClick = (e) => {
        e.preventDefault();

        alert('Feature Coming Soon')
    }

    return (
        <>
         <h2>{spot.name}</h2>
         <h3>{`${spot.city}, ${spot.state}, ${spot.country}`}</h3>
         <img src={previewImageUrl} />
         {otherImages.map(image => (
            <img key={image.id} src={image.url} />
         ))}
         <div>
            <h2>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
            <p>{spot.description}</p>
         </div>
         <ul>
            <li>{`$${spot.price}`}<span>night</span></li>
            <li><IoMdStar />{spot.avgStarRating}</li>
            <li>{spot.numReviews} reviews</li>
            <button onClick={handleClick}>Reserve</button>
         </ul>
         <hr></hr>
         <div>
            <ul>
               <li><IoMdStar />{spot.avgStarRating}</li>
               <span><LuDot /></span>
               <li>{spot.numReviews} reviews</li>
            </ul>
            {reviews.map(review => (
                <div key={review.id}>
                    <h3>{review.User.firstName}</h3>
                    {console.log(review)}
                    <h4>{formatReviewDate(review.updatedAt)}</h4>
                    <p>{review.review}</p>
                </div>
            ))}
         </div>
        </>
    )

};

export default SpotDetailsPage;
