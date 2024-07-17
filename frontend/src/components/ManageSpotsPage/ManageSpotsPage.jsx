import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadCurrentSpots } from "../../store/spot";
import { IoMdStar } from "react-icons/io";
import './ManageSpots.css'


const ManageSpotsPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const spotsObj = useSelector(state => state.spots.currentSpots)

    useEffect(() => {
        dispatch(loadCurrentSpots())
    }, [dispatch])

    if (!spotsObj) return null;

    const spots = Object.values(spotsObj);

    const handleClick = (spot) => {
        navigate(`/spots/${spot.id}`)
    }

    return (
        <main id="manage-spots-page">
            <h2>Manage Your Spots</h2>
            <button onClick={() => navigate('/spots/new')}>Create a New Spot</button>
            <div className='grid-container'>
            {spots.sort((a, b) => b.id - a.id).map(spot => (
                <div key={spot.id} className='grid-item'
                onClick={() => handleClick(spot)}
                >
                <div className='image-container-square'>
                    <p className='name' data->{spot.name}</p>
                    <img src={spot.previewImage}/>
                </div>
                <div className='spot-preview-text'>
                    <div>
                        <p style={{ maxWidth: '12em'}}>{`${spot.city}, ${spot.state}`}</p>
                        <p><span style={{fontWeight: 'bold'}}>${spot.price}</span> night</p>
                    </div>
                    <p style={{fontWeight: 'bold'}}><IoMdStar />{spot.avgRating}</p>
                </div>
                <div id="button-container">
                    <button>Update</button>
                    <button>Delete</button>
                </div>
                </div>
            ))}
            </div>
        </main>
    )
}

export default ManageSpotsPage;
