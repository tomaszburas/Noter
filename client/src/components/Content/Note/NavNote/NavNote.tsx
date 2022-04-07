import { Link, useNavigate } from 'react-router-dom';
import styles from './NavNote.module.css';

interface Props {
    noteId: string;
    setEdit: (value: boolean) => void;
    deleteNote: (id: string) => void;
}

export const NavNote = (props: Props) => {
    const navigate = useNavigate();

    const deleteNoteHandler = () => {
        props.deleteNote(props.noteId);
        navigate('/notes');
    };

    return (
        <div className={styles.noteNav}>
            <Link className={styles.link} to="/notes">
                <span className={styles.backBtn} title="Go back">
                    Go Back
                </span>
            </Link>

            <div className={styles.rightBoxTop}>
                <button
                    className={styles.deleteBtn}
                    onClick={deleteNoteHandler}
                    title="Delete note">
                    Delete
                </button>
                <button
                    className={styles.editBtn}
                    onClick={() => props.setEdit(true)}
                    title="Edit note">
                    Edit
                </button>
            </div>
        </div>
    );
};
