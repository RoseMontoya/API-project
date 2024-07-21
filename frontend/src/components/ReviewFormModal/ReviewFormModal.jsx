import { useModal } from '../../context/modal.jsx';
import { useEffect, useState } from 'react';
import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import './ReviewForm.css'
import { useDispatch } from 'react-redux';
import { createReview } from '../../store/spot.js';


const ReviewFormModal= ({spotId}) => {
    const dispatch = useDispatch()
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0)
    const [errors, setErrors] = useState({})
    const [disabled, setDisabled] = useState(true)
    const { closeModal, } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({})

        const payload = {
            review,
            stars: rating
        }

        dispatch(createReview(payload, spotId))
            .then(closeModal)
            .catch(async res => {
                const data = await res.json()
                setErrors(data)
            })
    }

    useEffect(() => {
        if (rating !== 0 && review.length >= 10 ) {
            setDisabled(false)
        }
    }, [rating, review])

    return (
        <div >
            <form id='create-review-container' onSubmit={handleSubmit}>
            <h2>How was your Stay?</h2>
            {errors?.message && <p className='error' style={{margin: 0 }}>{errors.message}</p>}
            <textarea
                rows='10'
                placeholder='Leave your review here...'
                value={review}
                onChange={(e) => setReview(e.target.value)}
            />

            <div id='stars'>
                <div
                    onClick={() => setRating(1)}
                    className='star'
                >
                    {rating >= 1? <TiStarFullOutline/> : <TiStarOutline/>}
                </div>
                <div
                    onClick={() => setRating(2)}
                    className='star'
                >
                    {rating >= 2? <TiStarFullOutline/> : <TiStarOutline/>}
                </div>
                <div
                    onClick={() => setRating(3)}
                    className='star'
                >
                    {rating >= 3? <TiStarFullOutline/> : <TiStarOutline/>}
                </div>
                <div
                    onClick={() => setRating(4)}
                    className='star'
                >
                    {rating >= 4? <TiStarFullOutline/> : <TiStarOutline/>}
                </div>
                <div
                    onClick={() => setRating(5)}
                    className='star'
                >
                    {rating >= 5? <TiStarFullOutline/> : <TiStarOutline/>}
                </div>
                <p style={{fontWeight: '700', padding: '.25em', paddingTop: 0}}>Stars</p>
            </div>

            <button type='submit' disabled={disabled} className={disabled? 'disabled' : ''}>Submit Review</button>
            </form>
        </div>
    )
}

export default ReviewFormModal
