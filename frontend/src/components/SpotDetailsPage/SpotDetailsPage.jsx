import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadSpot } from "../../store/spot";

const SpotDetailsPage = () => {
    const dispatch = useDispatch()
    const {spotId }= useParams()
    const spot = useSelector(state => state.spots[spotId])
    console.log(spot);

    useEffect(() => {
        dispatch(loadSpot(spotId))
    }, [dispatch])

    return (
        <>
         <h2>we are here</h2>
         <p>{spot.description}</p>
        </>
    )

};

export default SpotDetailsPage;
