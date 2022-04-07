import { FormEvent, useState } from 'react';
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
                <div className={styles.accessContainer}>
                    <p className={styles.accessTitle}>Sign In</p>
                    <form
                        className={styles.accessBox}
                        onSubmit={(e) => submitForm(e)}>
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
            ) : (
                <Navigate replace to="/notes" />
            )}
        </>
    );
};
