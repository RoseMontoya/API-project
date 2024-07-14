import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaCircleUser } from "react-icons/fa6";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from "../SignupFormPage";
const ProfileButton = ({user}) => {
    const dispatch =  useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()

    const logoutClick = (e) => {
        e.preventDefault();
        dispatch(logout())
    }

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu)
    };

    useEffect(() => {
        if(!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    const dropdownClasses ="profile-dropdown" + (showMenu ? "" : " hidden");
 return (
    <div>
    <button
        onClick={toggleMenu}
    >
        <FaCircleUser />
    </button>
    <ul className={dropdownClasses} ref={ulRef}>
        {user ? (
            <>
                <li>{user.username}</li>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.email}</li>
                <li>
                    <button onClick={logoutClick}>Log Out</button>
                </li>
            </>
        ) : (
            <>
            <li>
              <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </li>
            </>
        )}
    </ul>
    </div>
 )
}

export default ProfileButton;
