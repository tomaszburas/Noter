import { FormEvent, useState } from 'react';
import { Textarea } from './Textarea/Textarea';
import { ErrorContainer } from '../../../Common/ErrorContainer/ErrorContainer';
import styles from './Form.module.css';

interface Props {
    addNote: (text: string) => void;
}

export const Form = (props: Props) => {
    const [note, setNote] = useState('');
    const [error, setError] = useState({
        err: false,
        text: '',
    });

    const submitForm = (e: FormEvent): void => {
        e.preventDefault();

        if (note.trim().length < 5) {
            setError({
                err: true,
                text: 'The note cannot be shorter than 5 characters.',
            });
            return;
        }

        if (note.trim().length > 2500) {
            setError({
                err: true,
                text: 'Note cannot be longer than 2500 characters.',
            });
            return;
        }

        setError({ err: false, text: '' });
        props.addNote(note.trim());
        setNote('');
    };

    return (
        <form className={styles.form} onSubmit={submitForm}>
            <label className={styles.label}>
                <span className={styles.labelText}>Enter your note</span>
                <Textarea note={note} setNote={setNote} />
            </label>
            {error.err && <ErrorContainer errorText={error.text} />}
            <button className={styles.addBtn} title="Add note">
                Add note
            </button>
        </form>
    );
};
