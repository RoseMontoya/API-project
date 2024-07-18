import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/spot';
import { useModal } from '../../context/modal.jsx';

const DeleteReviewModal = ({reviewId, spotId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault()

        dispatch(deleteReview(reviewId, spotId))
            .then(closeModal())
    }

    const handleKeep = (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div>
            <form id='delete-form'>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <div id='buttons'>
                <button onClick={handleDelete}>Yes (Delete Review)</button>
                <button className='grey' onClick={handleKeep}>No (Keep Review)</button>
            </div>
            </form>
        </div>
    )
}

export default DeleteReviewModal;
