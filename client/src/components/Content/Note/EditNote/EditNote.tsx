import { useState } from 'react';
import { ErrorContainer } from '../../../Common/ErrorContainer/ErrorContainer';
import { Textarea } from '../../NotesPage/Form/Textarea/Textarea';
import styles from './EdtNote.module.css';

interface Props {
    noteId: string;
    noteDate: string | undefined;
    noteText: string;
    setNoteText: (text: string) => void;
    setEdit: (value: boolean) => void;
    editNote: (id: string, text: string) => void;
}

export const EditNote = (props: Props) => {
    const [error, setError] = useState({
        err: false,
        text: '',
    });

    const updateHandler = () => {
        if (props.noteText.trim().length < 5) {
            setError({
                err: true,
                text: 'The note cannot be shorter than 5 characters.',
            });
        } else if (props.noteText.trim().length > 2500) {
            setError({
                err: true,
                text: 'Note cannot be longer than 2500 characters.',
            });
        } else {
            setError({ err: false, text: '' });
            props.setEdit(false);
            props.editNote(props.noteId, props.noteText.trim());
        }
    };

    return (
        <div className={styles.noteContainer}>
            <div className={styles.leftBox}>
                {error.err && <ErrorContainer errorText={error.text} />}
                <Textarea note={props.noteText} setNote={props.setNoteText} />
                <p className={styles.noteDate}>{props.noteDate}</p>
            </div>
            <div className={styles.rightBox}>
                <button
                    className={styles.saveBtn}
                    onClick={() => updateHandler()}
                    title="Edit note">
                    Save
                </button>
            </div>
        </div>
    );
};
