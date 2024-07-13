import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { signup } from '../../store/session.js';
import './SignupForm.css';

const SignupFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    if (sessionUser) return <Navigate to="/" replace={true} />;

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

            try {
                await dispatch(signup(payload))
            } catch (err) {
                const errors = await err.json();
                setErrors(errors.errors)
            }
        }

    }

    return (
        <>
        <h2>Signup</h2>
        <form onSubmit={handleSumbit} className='userForm'>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
            />
            {errors.username && <p className='error'>{errors.username}</p>}
            <input
                type="text"
                placeholder="first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                name="firstName"
            />
            {errors.firstName && <p className='error'>{errors.firstName}</p>}
            <input
                type="text"
                placeholder="last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                name="lastName"
            />
            {errors.lastName && <p className='error'>{errors.lastName}</p>}
            <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
            />
            {errors.email && <p className='error'>{errors.email}</p>}
            <input
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
            />
            {errors.password && <p className='error'>{errors.password}</p>}
            <input
                type="text"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="confirmPassword"
            />
            {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
            <button type='submit'>Signup</button>
        </form>
        </>
    )
}

export default SignupFormPage;
