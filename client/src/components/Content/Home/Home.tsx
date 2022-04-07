import { Link } from 'react-router-dom';
import homeImg from '../../../assets/img/home-img.svg';
import styles from './Home.module.css';

export const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <p className={styles.homeTitle}>Notes app with markdown format.</p>
            <img className={styles.homeImg} src={homeImg} alt="home img" />
            <Link to="/notes">
                <button className={styles.homeBtn} title="Start now">
                    Start now ✍️
                </button>
            </Link>
        </div>
    );
};
