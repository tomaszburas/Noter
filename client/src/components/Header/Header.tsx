import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import styles from './Header.module.css';

interface Props {
    auth: boolean;
    setAuth: (value: boolean) => void;
}

export const Header = (props: Props) => {
    const navigate = useNavigate();

    const logoutHandler = async () => {
        const res = await fetch('/logout');
        const data = await res.json();

        if (data.success) {
            props.setAuth(false);
            navigate('/');
        }
    };

    return (
        <header className={styles.header}>
            <Link to="/">
                <img
                    src={logo}
                    className={styles.logo}
                    alt="Logo"
                    title="Noter"
                />
            </Link>
            <div className={styles.accessHeader}>
                {props.auth ? (
                    <>
                        <Link to="/notes">
                            <p
                                className={styles.accessHeaderTextMarginRight}
                                title="Notes">
                                Notes
                            </p>
                        </Link>
                        <p
                            className={styles.accessHeaderText}
                            onClick={logoutHandler}
                            title="Logout">
                            Logout
                        </p>
                    </>
                ) : (
                    <>
                        <Link to="/sign-in">
                            <p
                                className={styles.accessHeaderTextMarginRight}
                                title="Sign In">
                                Sign In
                            </p>
                        </Link>
                        <Link to="/sign-up">
                            <p
                                className={styles.accessHeaderText}
                                title="Sign Up">
                                Sign Up
                            </p>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};
