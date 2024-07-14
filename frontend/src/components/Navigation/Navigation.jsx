import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import OpenModalButton from '../OpenModalButton'
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormPage";
import './Navigation.css';

const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector(state => state.session.user)

    const sessionLinks = sessionUser? (
        <>
            <li>
                <ProfileButton user = {sessionUser} />
            </li>
        </>
    ) : (
        <div>
          <li>
            <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
            />
          </li>
          <li>
            <OpenModalButton
                buttonText='Sign Up'
                modalComponent={<SignupFormModal />}
            />
          </li>
        </div>
    );

    return (
        <nav>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
        </nav>
    )
};

export default Navigation;
