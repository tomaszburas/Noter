import { NoteElement } from './NoteElement/NoteElement';
import styles from './NotesList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { useEffect } from 'react';
import { getNotes } from '../../../../redux/features/user/notes-slice';

export const NotesList = () => {
    const dispatch = useDispatch();
    const { notes } = useSelector((store: RootState) => store.note);
    const { isAuth } = useSelector((store: RootState) => store.user);

    useEffect(() => {
        dispatch(getNotes());
    }, [isAuth]);

    return (
        <div className={styles.notesContainer}>
            <p>Notes List</p>
            {notes.length ? (
                notes.map((note) => {
                    return <NoteElement key={note.id} note={note} />;
                })
            ) : (
                <p className={styles.text}>No notes.</p>
            )}
        </div>
    );
};
