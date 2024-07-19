import { useDispatch } from 'react-redux';
import { deleteSpot } from '../../store/spot';
import { useModal } from '../../context/modal.jsx';

import './DeleteSpot.css'

const DeleteSpotModal = ({spotId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const handleDelete = (e) => {
        e.preventDefault();

        dispatch(deleteSpot(spotId))
            .then(closeModal)
    }

    const handleKeep = (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div>
            <form id='delete-form'>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <div id='buttons'>
                <button onClick={handleDelete}>Yes (Delete Spot)</button>
                <button className='grey' onClick={handleKeep}>No (Keep Spot)</button>
            </div>
            </form>
        </div>
    )
}

export default DeleteSpotModal;
