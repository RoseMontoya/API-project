import { useModal } from '../../context/modal.jsx';
import { useState } from 'react';
import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import './ReviewForm.css'


const ReviewFormModal= () => {

    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0)
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal();

    return (
        <div >
            <form id='create-review-container'>
            <h2>How was your Stay?</h2>
            {errors?.review && <p className='error'>{errors.review}</p>}
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

            <button type='submit'>Submit Review</button>
            </form>
        </div>
    )
}

export default ReviewFormModal
