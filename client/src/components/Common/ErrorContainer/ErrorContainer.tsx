import styles from './ErrorContainer.module.css';

interface Props {
    errorText: string;
}

export const ErrorContainer = (props: Props) => {
    return (
        <div className={styles.error__container}>
            <p className={styles.error__text}>{props.errorText}</p>
        </div>
    );
};
