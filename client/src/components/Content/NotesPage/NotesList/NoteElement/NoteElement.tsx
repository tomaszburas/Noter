import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import styles from './NoteElement.module.css';
import { NoteRecordEntity } from 'types';

interface Props {
    note: NoteRecordEntity;
    deleteNote: (id: string) => void;
    editNote: (id: string, text: string) => void;
}

export const NoteElement = (props: Props) => {
    return (
        <div className={styles.notes__container}>
            <div className={styles.left__box}>
                <ReactMarkdown>{props.note.text}</ReactMarkdown>
                <p className={styles.note__date}>{props.note.date}</p>
            </div>
            <div className={styles.right__box}>
                <Link
                    className={styles.show__btn}
                    to={`/notes/${props.note.id}`}>
                    <button title="Delete note">Show</button>
                </Link>
            </div>
        </div>
    );
};
