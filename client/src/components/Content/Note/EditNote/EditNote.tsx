import { useState } from 'react';
import { ErrorContainer } from '../../../Common/ErrorContainer/ErrorContainer';
import { Textarea } from '../../NotesPage/Form/Textarea/Textarea';
import styles from './EdtNote.module.css';
import { useDispatch } from 'react-redux';
import { editNote } from '../../../../redux/features/user/notes-slice';

interface Props {
    noteId: string;
    noteDate: string | undefined;
    noteText: string;
    setNoteText: (text: string) => void;
    setEdit: (value: boolean) => void;
}

export const EditNote = ({
    noteId,
    noteDate,
    noteText,
    setNoteText,
    setEdit,
}: Props) => {
    const dispatch = useDispatch();
    const [error, setError] = useState({
        err: false,
        text: '',
    });

    const updateHandler = () => {
        if (noteText.trim().length < 5) {
            setError({
                err: true,
                text: 'The note cannot be shorter than 5 characters.',
            });
            return;
        }

        if (noteText.trim().length > 2500) {
            setError({
                err: true,
                text: 'Note cannot be longer than 2500 characters.',
            });
            return;
        }

        setError({ err: false, text: '' });
        setEdit(false);
        dispatch(editNote({ id: noteId, text: noteText.trim() }));
    };

    return (
        <div className={styles.noteContainer}>
            <div className={styles.leftBox}>
                {error.err && <ErrorContainer errorText={error.text} />}
                <Textarea note={noteText} setNote={setNoteText} />
                <p className={styles.noteDate}>{noteDate}</p>
            </div>
            <div className={styles.rightBox}>
                <button
                    className={styles.saveBtn}
                    onClick={updateHandler}
                    title="Edit note">
                    Save
                </button>
            </div>
        </div>
    );
};
