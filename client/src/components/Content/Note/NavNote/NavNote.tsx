import { Link, useNavigate } from 'react-router-dom';
import styles from './NavNote.module.css';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../../../../redux/features/user/notes-slice';

interface Props {
    noteId: string;
    setEdit: (value: boolean) => void;
}

export const NavNote = ({ noteId, setEdit }: Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteNoteHandler = () => {
        dispatch(deleteNote(noteId));
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
                    onClick={() => setEdit(true)}
                    title="Edit note">
                    Edit
                </button>
            </div>
        </div>
    );
};
