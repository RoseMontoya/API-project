import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadSpot } from "../../store/spot";
import { IoMdStar } from "react-icons/io";
import { LuDot } from "react-icons/lu";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ReviewFormModal from "../ReviewFormModal";

import './SpotDetails.css'

const months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"]

const SpotDetailsPage = () => {
    const dispatch = useDispatch()
    const { spotId }= useParams()
    const spot = useSelector(state => state.spots.currentSpot)
    const reviews = spot?.reviews? Object.values(spot.reviews) : []
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(loadSpot(spotId))
    }, [dispatch, spotId])

    if (!spot || !spot.SpotImages) return null;

    const images = [];
    spot.SpotImages.forEach(image => {
        if (image.preview === true) {
            images.unshift(image)
        } else {
            images.push(image)
        }
    })

    const handleClick = (e) => {
        e.preventDefault();

        alert('Feature Coming Soon')
    }

    const numReviewsText = (numReviews) => {
        if (numReviews === 0) return '';
        if (numReviews === 1) return '1 review'
        return `${numReviews} reviews`
    }

    const hasReview = reviews.find(review => review.userId === user?.id)
    const showReviewButton = () => {
        console.log(user && user.id !== spot.ownerId && !hasReview)
        if (user && user?.id !== spot.ownerId && !hasReview) {
            return true;
        }
        return false
    }



    const formatReviewDate = (date) => {
        const dateSplit = date.split('-')
        const month = Number(dateSplit[1])
        const year = dateSplit[0]
        return `${months[month - 1]} ${year}`
    }

    return (
        <main id="spot-details-page">

         <h2 >{spot.name}</h2>
         <h3>{`${spot.city}, ${spot.state}, ${spot.country}`}</h3>

        <div className="image-gallery">
         {images.map((image, index) => (
            <div key={image.id} className={`image-container image-${index + 1}`}>
                <img src={image.url} alt={`Image ${index + 1}`}/>
            </div>
         ))}
        </div>

        <div id="spot-details">
         <div>
            <h2>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
            <p>{spot.description}</p>
         </div>
         <div id="reserve">
            <ul>
               <li id="price"><span style={{fontSize: '18px', fontWeight:'500'}}>{`$${spot.price}`}</span>night</li>
               <div id="right">
                <li><IoMdStar />{spot.avgStarRating}</li>
                <LuDot className={spot.numReviews === 0? 'hide' : ''}/>
                <li>{numReviewsText(spot.numReviews)}</li>
               </div>
            </ul>
            <button onClick={handleClick} id="reserve-button">Reserve</button>
         </div>
        </div>

         <hr></hr>

         <div>
            <ul id="reviews-stats">
               <li><IoMdStar />{spot.avgStarRating}</li>
               <LuDot className={spot.numReviews === 0? 'hide': ''} />
               <li>{numReviewsText(spot.numReviews)}</li>
            </ul>
            <OpenModalMenuItem
                className={`${showReviewButton()? '' : 'hide'} review-button`}
                itemText="Post Your Review"
                modalComponent={<ReviewFormModal spotId={spotId}/>}
              />
            {(!reviews.length) && showReviewButton()? <p>Be the first to post a Review!</p> : reviews.sort((a, b) => b.id - a.id).map(review => (
                <div key={review.id} className="review">
                    <h3>{review.User?.firstName}</h3>
                    <h4>{formatReviewDate(review.updatedAt)}</h4>
                    <p>{review.review}</p>
                   { console.log(user.id, review.userId)}
                    <OpenModalMenuItem
                        className={`${user.id === review.userId? '' : 'hide'} review-button`}
                        itemText="Delete"
                        modalComponent={<ReviewFormModal reviewId={review.id}/>}
              />
                </div>
            ))
        }
         </div>
        </main>
    )

};

export default SpotDetailsPage;
