import styles from './ErrorContainer.module.css';

interface Props {
    errorText: string;
}

export const ErrorContainer = (props: Props) => {
    return (
        <div className={styles.errorContainer}>
            <p className={styles.errorText}>{props.errorText}</p>
        </div>
    );
};
