import React from 'react';
import { Link } from 'react-router-dom';
import homeImg from '../../../assets/img/home-img.svg';
import styles from './Home.module.css';

export const Home = () => {
    return (
        <div className={styles.home__container}>
            <p className={styles.home__title}>
                Notes application with markdown format.
            </p>
            <img className={styles.home__img} src={homeImg} alt="home img" />
            <Link to="/notes">
                <button className={styles.home__btn} title="Start now">
                    Start now ✍️
                </button>
            </Link>
        </div>
    );
};
