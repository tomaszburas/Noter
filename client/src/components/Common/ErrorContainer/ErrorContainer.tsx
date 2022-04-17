import styles from './ErrorContainer.module.css';

interface Props {
    errorText: string;
}

export const ErrorContainer = ({ errorText }: Props) => {
    return (
        <div className={styles.errorContainer}>
            <p className={styles.errorText}>{errorText}</p>
        </div>
    );
};
