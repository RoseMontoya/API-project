import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaCircleUser } from "react-icons/fa6";
import { logout } from "../../store/session";
import OpenModalMenuItem from './OpenModalMenuItem'
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from "../SignupFormModal";
const ProfileButton = ({user}) => {
    const dispatch =  useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()


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

    const closeMenu = () => setShowMenu(false);

    const logoutClick = (e) => {
        e.preventDefault();
        dispatch(logout())
        closeMenu()
    }

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
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
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
