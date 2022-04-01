import './NoteElement.css';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {useState} from "react";
import {ErrorContainer} from "../../Form/ErrorContainer/ErrorContainer";
import {Textarea} from "../../Form/Textarea/Textarea";

export const NoteElement = props => {
    const [edit, setEdit] = useState(false);
    const [updateNote, setUpdateNote] = useState(props.note);
    const [error, setError] = useState({
        err: false,
        text: ''
    });

    const updateHandler = () => {
        if (updateNote.trim().length < 5) {
            setError({err: true, text: 'The note cannot be shorter than 5 characters.'});
        } else if (updateNote.trim().length > 2500) {
            setError({err: true, text: 'Note cannot be longer than 2500 characters.'});
        } else {
            setError({err: false, text: ''});
            setEdit(!edit);
            props.editNote(props.id, updateNote.trim());
        }
    }

    return (
        <div className="notes-container">
            {
                !edit
                    ? <>
                        <div className="notes-left-box">
                            <ReactMarkdown className="notes-text">{props.note}</ReactMarkdown>
                            <Link className="notes-date" to={`/notes/${props.id}`}>{props.date}</Link>
                        </div>
                        <div className="notes-right-box">
                            <button className="notes-delete__btn" onClick={() => props.deleteNote(props.id)}
                                    title="Delete note">Delete
                            </button>
                            <button className="notes-edit__btn" onClick={() => setEdit(!edit)} title="Edit note">Edit
                            </button>
                        </div>
                    </>
                    : <>
                        <div className="notes-left-box">
                            {error.err && <ErrorContainer errorText={error.text} edit={true}/>}
                            <Textarea note={updateNote} setNote={setUpdateNote}/>
                            <Link className="notes-date" to={`/notes/${props.id}`}>{props.date}</Link>
                        </div>
                        <div className="notes-right-box-save">
                            <button className="notes-edit-save__btn" onClick={() => updateHandler()} title="Edit note">Save
                            </button>
                        </div>
                    </>
            }
        </div>
    )
}
