import { useDispatch, useSelector } from 'react-redux';

const LandingPage = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state)


    return (
        <h2>This is the landing page</h2>
    )
};

export default LandingPage;
