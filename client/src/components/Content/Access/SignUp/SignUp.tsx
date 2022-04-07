import { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ErrorContainer } from '../../../Common/ErrorContainer/ErrorContainer';
import styles from '../Access.module.css';

interface Props {
    auth: boolean;
}

export const SignUp = (props: Props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState({
        err: false,
        text: '',
    });

    const navigate = useNavigate();

    const submitForm = async (e: FormEvent) => {
        e.preventDefault();
        setError({ err: false, text: '' });

        const res = await fetch('/sign-up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username.trim(),
                password: password.trim(),
                repeatPassword: repeatPassword.trim(),
            }),
        });

        const data = await res.json();

        if (data.success) {
            navigate('/sign-in');
        } else {
            setError({ err: true, text: data.message });
        }
    };

    return (
        <>
            {!props.auth ? (
                <div className={styles.accessContainer}>
                    <p className={styles.accessTitle}>Sign Up</p>
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
                        <label className={styles.accessLabel}>
                            <span className={styles.labelText}>
                                Repeat password:
                            </span>
                            <input
                                type="password"
                                value={repeatPassword}
                                onChange={(e) =>
                                    setRepeatPassword(e.target.value)
                                }
                            />
                        </label>
                        {error.err && <ErrorContainer errorText={error.text} />}
                        <div className={styles.buttonContainer}>
                            <button
                                type="submit"
                                className={styles.accessBtn}
                                title="Sign up">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <Navigate replace to="/sign-in" />
            )}
        </>
    );
};
