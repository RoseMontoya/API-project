import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { login } from '../../store/session.js';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSumbit = (e) => {
        e.preventDefault();

        const payload = {
            credential,
            password
        }

        try {
            const res = dispatch(login(payload))
            // navigate('/')
        } catch (err) {
            if (err.status === 401) {
                setErrors(err)
            }
            if (err.status === 400) {
                setErrors(err.errors)
            }
        }
    }

    return (
        <form onSubmit={handleSumbit}>
            <input
                type="text"
                placeholder="username or email"
                value={credential}
                onChange={() => setCredential(e.target.value)}
                name="credential"
            />
            {errors.credential && <p className='error'>{errors.credential}</p>}
            <input
                type="text"
                placeholder="password"
                value={password}
                onChange={() => setPassword(e.target.value)}
                name="password"
            />
            {errors.password && <p className='error'>{errors.password}</p>}
            {errors.message && <p className='error'>{errors.message}</p>}
            <button type='submit'>Login</button>
        </form>
    )
}

export default LoginFormPage;
