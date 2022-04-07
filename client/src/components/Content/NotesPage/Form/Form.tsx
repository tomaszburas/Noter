import React, { FormEvent, useState } from 'react';
import { Textarea } from './Textarea/Textarea';
import { ErrorContainer } from '../../../Common/ErrorContainer/ErrorContainer';
import styles from './Form.module.css';

interface Props {
    addNote: (text: string) => void;
}

export const Form = (props: Props) => {
    const [note, setNote] = useState<string>('');
    const [error, setError] = useState<{ err: boolean; text: string }>({
        err: false,
        text: '',
    });

    const submitForm = (e: FormEvent) => {
        e.preventDefault();

        if (note.trim().length < 5) {
            setError({
                err: true,
                text: 'The note cannot be shorter than 5 characters.',
            });
        } else if (note.trim().length > 2500) {
            setError({
                err: true,
                text: 'Note cannot be longer than 2500 characters.',
            });
        } else {
            setError({ err: false, text: '' });
            props.addNote(note.trim());
            setNote('');
        }
    };

    return (
        <form className={styles.form} onSubmit={(e) => submitForm(e)}>
            <label className={styles.label}>
                <span className={styles.label__text}>Enter your note</span>
                <Textarea note={note} setNote={setNote} />
            </label>
            {error.err && <ErrorContainer errorText={error.text} />}
            <button className={styles.add__btn} title="Add note">
                Add note
            </button>
        </form>
    );
};
