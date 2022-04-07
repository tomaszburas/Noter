import styles from './Textarea.module.css';

interface Props {
    note: string;
    setNote: (text: string) => void;
}

export const Textarea = (props: Props) => {
    return (
        <textarea
            className={styles.textarea}
            onChange={(e) => props.setNote(e.target.value)}
            value={props.note}
            placeholder="Note text..."
        />
    );
};
