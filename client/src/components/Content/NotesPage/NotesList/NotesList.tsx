import { NoteElement } from './NoteElement/NoteElement';
import styles from './NotesList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { useEffect, useState } from 'react';
import { getNotes } from '../../../../redux/features/notes-slice';
import { Loader } from '../../../Common/Loader/Loader';

export const NotesList = () => {
    const dispatch = useDispatch();
    const { notes } = useSelector((store: RootState) => store.note);
    const { isAuth } = useSelector((store: RootState) => store.user);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getNotes());
        setLoading(true);
    }, [isAuth]);

    if (!loading) {
        return <Loader />;
    }

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
