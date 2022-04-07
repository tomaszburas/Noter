import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export const NotFound = () => {
    return (
        <>
            <Link className={styles.link} to="/">
                <span className={styles.backBtn} title="Go home">
                    Go Home
                </span>
            </Link>
            <div className={styles.container}>
                <p className={styles.containerText}>404: Page Not Found 🛑</p>
            </div>
        </>
    );
};
