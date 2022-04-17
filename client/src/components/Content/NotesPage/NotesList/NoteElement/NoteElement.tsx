import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import styles from './NoteElement.module.css';
import { NotesEntity } from 'types';

interface Props {
    note: NotesEntity;
}

export const NoteElement = ({ note }: Props) => {
    return (
        <div className={styles.notesContainer}>
            <div className={styles.leftBox}>
                <ReactMarkdown>{note.text}</ReactMarkdown>
                <p className={styles.noteDate}>{note.date}</p>
            </div>
            <div className={styles.rightBox}>
                <Link className={styles.showBtn} to={`/notes/${note.id}`}>
                    <button title="Show note">Show</button>
                </Link>
            </div>
        </div>
    );
};
