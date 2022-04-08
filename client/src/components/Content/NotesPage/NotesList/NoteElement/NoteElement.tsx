import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import styles from './NoteElement.module.css';
import { NotesEntity } from 'types';

interface Props {
    note: NotesEntity;
    deleteNote: (id: string) => void;
    editNote: (id: string, text: string) => void;
}

export const NoteElement = (props: Props) => {
    return (
        <div className={styles.notesContainer}>
            <div className={styles.leftBox}>
                <ReactMarkdown>{props.note.text}</ReactMarkdown>
                <p className={styles.noteDate}>{props.note.date}</p>
            </div>
            <div className={styles.rightBox}>
                <Link className={styles.showBtn} to={`/notes/${props.note.id}`}>
                    <button title="Delete note">Show</button>
                </Link>
            </div>
        </div>
    );
};
