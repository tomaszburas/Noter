import './Form.css';
import {useState} from "react";
import {Textarea} from "./Textarea/Textarea";
import {ErrorContainer} from "./ErrorContainer/ErrorContainer";

export const Form = props => {
    const [note, setNote] = useState('');
    const [error, setError] = useState({
        err: false,
        text: ''
    });

    const submitForm = e => {
        e.preventDefault();

        if (note.trim().length < 5) {
            setError({err: true, text: 'The note cannot be shorter than 5 characters.'});
        } else if (note.trim().length > 2500) {
            setError({err: true, text: 'Note cannot be longer than 2500 characters.'});
        } else {
            setError({err: false, text: ''});
            props.addNote(note.trim());
            setNote('');
        }
    }

    return (
        <form className="note-form" onSubmit={submitForm}>
            <label className="label">
                <span className="label-text">Enter your note</span>
                <Textarea note={note} setNote={setNote}/>
            </label>
            {error.err && <ErrorContainer errorText={error.text}/>}
            <button className="note-add__btn" title="Add note">Add note</button>
        </form>
    );
}
