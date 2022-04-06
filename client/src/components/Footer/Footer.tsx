import React from 'react';
import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <a
                href="https://github.com/tomaszburas"
                className={styles.footer__text}
                title="GitHub">
                @Tomaszenko
            </a>
        </footer>
    );
};
