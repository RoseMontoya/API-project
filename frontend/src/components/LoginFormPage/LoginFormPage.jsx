import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/session.js';
import './LoginForm.css';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSumbit = async (e) => {
        e.preventDefault();

        const payload = {
            credential,
            password
        }

        try {
            const res = await dispatch(login(payload))
            navigate('/')
        } catch (err) {
            const errors = await err.json()
            if (err.status === 401) {
                setErrors(errors)
            }
            if (err.status === 400) {
                console.log(errors)
                setErrors(errors.errors)
            }
        }
    }

    return (
        <div>
        <h2>Login</h2>
        <form onSubmit={handleSumbit} className='userForm'>
            <input
                type="text"
                placeholder="username or email"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                name="credential"
            />
            {errors.credential && <p className='error'>{errors.credential}</p>}
            <input
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
            />
            {errors.password && <p className='error'>{errors.password}</p>}
            {errors.message && <p className='error'>{errors.message}</p>}
            <button type='submit'>Login</button>
        </form>
        </div>
    )
}

export default LoginFormPage;
