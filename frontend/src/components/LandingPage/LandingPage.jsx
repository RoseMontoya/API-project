import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { loadAllSpots } from '../../store/spot';
import { IoMdStar } from "react-icons/io";
import './LandingPage.css'

const LandingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const spots = useSelector(state => state.spots? Object.values(state.spots) : []);
    console.log(spots)

    useEffect(() => {
        dispatch(loadAllSpots())
    }, [dispatch])

    const handleClick = (spot) => {
        navigate(`/spots/${spot.id}`)
    }

    return (
        <main className='grid-container'>
            {spots.map(spot => (
                <div key={spot.id} className='grid-item'
                onClick={() => handleClick(spot)}
                >
                {console.log(spot.previewImage)}
                <div className='image-container-square'>
                    <img src={spot.previewImage}/>
                </div>
                <div>
                    <div>
                        <p>{`${spot.city}, ${spot.state}`}</p>
                        <p>{`$${spot.price} night`}</p>
                    </div>
                    <p><IoMdStar />{spot.avgRating}</p>
                </div>
                </div>
            ))}
        </main>
    )
};

export default LandingPage;
