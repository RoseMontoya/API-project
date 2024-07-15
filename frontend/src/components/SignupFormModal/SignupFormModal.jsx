import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/modal.jsx'
import { signup } from '../../store/session.js';
import './SignupForm.css';

const SignupFormModal = () => {
    const dispatch = useDispatch();
    const { closeModal } = useModal()

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        setErrors({})

        if (username.length < 4 ||password.length < 6 || firstName.length < 2 || lastName.length < 2 || confirmPassword.length < 6 || !email.length
        )  return setDisabled(true)

        setDisabled(false)
    }, [username, password, email, firstName, lastName, confirmPassword])

    const handleSumbit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrors({confirmPassword: 'Passwords do not match'});
        } else {
            const payload = {
                username,
                firstName,
                lastName,
                email,
                password
            }

           dispatch(signup(payload))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data?.errors) {
                        setErrors(data.errors);
                    }
                })

        }

    }

    return (
        <>
        <form onSubmit={handleSumbit} className='userForm'>
        <h2>Signup</h2>
                {errors.email && <p className='error'>{errors.email}</p>}
                {errors.username && <p className='error'>{ errors.username ||"Username is invalid"}</p>}
                {errors.firstName && <p className='error'>First name is invalid</p>}
                {errors.lastName && <p className='error'>Last name is invalid</p>}
                {errors.password && <p className='error'>Password is invalid</p>}
                {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}

            <label>
                Email
            <input
                type="text"
                // placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
            />
            </label>
            <label>
                Username
                <input
                    type="text"
                    // placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                />
            </label>
            <label>
                First Name
                <input
                    type="text"
                    // placeholder="first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    name="firstName"
                />
            </label>
            <label>
                Last Name
                <input
                    type="text"
                    // placeholder="last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    name="lastName"
                />
            </label>
            <label>
                Password
                <input
                    type="text"
                    // placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                />
            </label>
            <label>
                Confirm Password
                <input
                    type="text"
                    // placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name="confirmPassword"
                />
            </label>
            <button disabled={disabled} className={disabled? 'disabled' : ''}  type='submit'>Signup</button>
        </form>
        </>
    )
}

export default SignupFormModal;
