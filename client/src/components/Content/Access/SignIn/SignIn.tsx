import React, { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ErrorContainer } from '../../../Common/ErrorContainer/ErrorContainer';
import styles from '../Access.module.css';

interface Props {
    auth: boolean;
    setAuth: (value: boolean) => void;
}

export const SignIn = (props: Props) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<{ err: boolean; text: string }>({
        err: false,
        text: '',
    });

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
            props.setAuth(true);
            navigate('/notes');
        } else {
            setError({ err: true, text: data.message });
        }
    };

    return (
        <>
            {!props.auth ? (
                <div className={styles.access__container}>
                    <p className={styles.access__title}>Sign In</p>
                    <form
                        className={styles.access__box}
                        onSubmit={(e) => submitForm(e)}>
                        <label className={styles.access__label}>
                            <span className={styles.label__text}>Login:</span>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <label className={styles.access__label}>
                            <span className={styles.label__text}>
                                Password:
                            </span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        {error.err && <ErrorContainer errorText={error.text} />}
                        <div className={styles.button__container}>
                            <button
                                type="submit"
                                className={styles.access__btn}
                                title="Sign in">
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <Navigate replace to="/notes" />
            )}
        </>
    );
};
