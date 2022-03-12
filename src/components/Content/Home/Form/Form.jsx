import './Form.css';
import {useState} from "react";

export const Form = props => {
    const [note, setNote] = useState('');
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');

    const submitForm = e => {
        e.preventDefault();

        if (note.trim().length < 5) {
            setError(true);
            setErrorText('The note cannot be shorter than 5 characters.')
        } else if (note.trim().length > 1500) {
            setError(true);
            setErrorText('Note cannot be longer than 1500 characters.');
        } else {
            setError(false);
            props.addNote(note.trim());
            setNote('');
        }
    }

    return (
        <form className="note-form" onSubmit={submitForm}>
            <label className="label">
                <span className="label-text">Enter your note</span>
                <textarea
                    className="textarea"
                    onChange={e => setNote(e.target.value)}
                    value={note}
                    placeholder="Note text..."/>
            </label>
            {error
                ? <div className="error-container">
                     <p className="error-text">{errorText}</p>
                  </div>
                : null
            }
            <button className="note-add__btn">Add note</button>
        </form>
    );
}
