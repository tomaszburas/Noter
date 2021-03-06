import { FormEvent, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorContainer } from '../../../Common/ErrorContainer/ErrorContainer';
import styles from '../Access.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth } from '../../../../redux/features/users-slice';

export const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({
        err: false,
        text: '',
    });
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const submitForm = async (e: FormEvent) => {
        e.preventDefault();
        setError({ err: false, text: '' });

        const res = await fetch('/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username.trim(),
                password: password.trim(),
            }),
        });

        const data = await res.json();

        if (data.success) {
            dispatch(setIsAuth(true));
            navigate('/notes');
        } else {
            setError({ err: true, text: data.message });
        }
    };

    return (
        <div className={styles.accessContainer}>
            <p className={styles.accessTitle}>Sign In</p>
            <form className={styles.accessBox} onSubmit={submitForm}>
                <label className={styles.accessLabel}>
                    <span className={styles.labelText}>Login:</span>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label className={styles.accessLabel}>
                    <span className={styles.labelText}>Password:</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {error.err && <ErrorContainer errorText={error.text} />}
                <div className={styles.buttonContainer}>
                    <button
                        type="submit"
                        className={styles.accessBtn}
                        title="Sign in">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};
