import React from 'react';
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
        <div className={styles.note__nav}>
            <Link className={styles.link} to="/notes">
                <span className={styles.back__btn} title="Go back">
                    Go Back
                </span>
            </Link>

            <div className={styles.right__box__top}>
                <button
                    className={styles.delete__btn}
                    onClick={() => deleteNoteHandler()}
                    title="Delete note">
                    Delete
                </button>
                <button
                    className={styles.edit__btn}
                    onClick={() => props.setEdit(true)}
                    title="Edit note">
                    Edit
                </button>
            </div>
        </div>
    );
};
