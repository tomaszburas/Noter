import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setIsAuth } from '../../redux/features/users-slice';
import { RootState } from '../../redux/store';
import logo from '../../assets/img/logo.png';
import styles from './Header.module.css';

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuth } = useSelector((store: RootState) => store.user);

    const logoutHandler = async () => {
        const res = await fetch('/logout');
        const data = await res.json();

        if (data.success) {
            dispatch(setIsAuth(null));
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
                {isAuth ? (
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
