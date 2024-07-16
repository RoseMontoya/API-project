import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session.js';
import { useModal } from '../../context/modal.jsx';
import './LoginForm.css';

const LoginFormModal = () => {
    const dispatch = useDispatch();

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true)
    const { closeModal } = useModal();

    const handleSumbit = async (e) => {
        e.preventDefault();
        setErrors({});

        const payload = {
            credential,
            password
        }
        return dispatch(login(payload))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                }
            });
    }

    const demoUser = () => {
        setCredential('MageOfTevinter');
        setPassword('magisterial123');
        return dispatch(login({credential, password}))
            .then(closeModal);
    }

    useEffect(() => {
        if (credential.length >= 4 && password.length >= 6) {
            setDisabled(false)
        }
        setErrors({})
    }, [credential, password])

    return (
        <div>
        <form onSubmit={handleSumbit} className='userForm'>
        <h2 >Log In</h2>
            {errors.message && <p className='error'>The provided credentials were invalid.</p>}
            <label>
                Username or Email
                <input
                    type="text"
                    // placeholder="username or email"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    name="credential"
                />
                {/* {errors.credential && <p className='error'>{errors.credential}</p>} */}
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
                {/* {errors.password && <p className='error'>{errors.password}</p>} */}
            </label>
            <button type='submit' disabled={disabled} className={disabled? "disabled" : ""}>Log In</button>
            <li onClick={() => demoUser()} id='demoUser'>Log in as Demo User</li>
        </form>
        </div>
    )
}

export default LoginFormModal;
