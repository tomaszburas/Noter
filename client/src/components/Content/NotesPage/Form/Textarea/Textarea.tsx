import styles from './Textarea.module.css';

interface Props {
    note: string;
    setNote: (text: string) => void;
}

export const Textarea = ({ note, setNote }: Props) => {
    return (
        <textarea
            className={styles.textarea}
            onChange={(e) => setNote(e.target.value)}
            value={note}
            placeholder="Note text..."
        />
    );
};
