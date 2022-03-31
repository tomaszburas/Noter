import './Note.css';
import ReactMarkdown from "react-markdown";
import {Link, useParams, useNavigate} from 'react-router-dom';
import moment from "moment";
import {useEffect, useState} from "react";
import {ErrorContainer} from "../NotesApp/Form/ErrorContainer/ErrorContainer";
import {Textarea} from "../NotesApp/Form/Textarea/Textarea";

export const Note = props => {
    const [edit, setEdit] = useState(true);
    const [noteObj, setNoteObj] = useState({});
    const [noteText, setNoteText] = useState('');
    const [error, setError] = useState({
        err: false,
        text: ''
    });

    const id = useParams().id;
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await fetch(`/notes/${id}`, {
                headers: {'Authorization': props.token}
            });
            const data = await res.json();

            if (data) {
                data.date = `${moment(data.createdAt).format('L')} - ${moment(data.createdAt).format('LT')}`;
            }

            setNoteText(data.note.note);
            setNoteObj(data);
        })();
    }, [id, props.token]);

    useEffect(() => {
        !props.auth && navigate('/sign-in')
    }, [props.auth, navigate])

    const deleteNoteHandler = () => {
        props.deleteNote(id);
        navigate('/notes');
    }

    const updateHandler = () => {
        if (noteText.trim().length < 5) {
            setError({err: true, text: 'The note cannot be shorter than 5 characters.'});
        } else if (noteText.trim().length > 2500) {
            setError({err: true, text: 'Note cannot be longer than 2500 characters.'});
        } else {
            setError({err: false, text: ''});
            setEdit(!edit);
            props.editNote(id, noteText.trim());
        }
    }

    return (
        <>
            {noteObj && props.auth
                ? <>
                     <div className="note-nav">
                         <Link className="link" to='/notes'><span className="note-go-back__btn" title="Go back">Go Back</span></Link>

                         <div className="note__right-box">
                             <button className="note-delete__btn" onClick={deleteNoteHandler} title="Delete note">Delete</button>
                             <button className="notes-edit__btn" style={{marginLeft: 'var(--margin-sm)'}} onClick={() => setEdit(!edit)} title="Edit note">Edit</button>
                         </div>
                     </div>
                     <div className="note-box">
                         <p className="note-header">Note</p>
                         <div className="note-content">
                             {
                                 edit
                                     ? <>
                                         <ReactMarkdown>{noteText}</ReactMarkdown>
                                         <p className="note-date">{noteObj.date}</p>
                                     </>
                                     : <div className="note-wrapper">
                                         <div className="notes-left-box">
                                             {error.err && <ErrorContainer errorText={error.text} edit={true} />}
                                             <Textarea note={noteText} setNote={setNoteText}/>
                                             <p className="note-date">{noteObj.date}</p>
                                         </div>
                                         <div className="notes-right-box">
                                             <button className="notes-edit__btn" onClick={() => updateHandler()} title="Edit note">Save</button>
                                         </div>
                                     </div>
                             }
                         </div>
                     </div>
                  </>
                : <>
                     <Link className="link" to='/notes'><span className="note-go-back__btn" title="Go back">Go Back</span></Link>
                     <div className="note-box">
                         <p className="note-box__text">There is no such note</p>
                     </div>
                  </>
            }
        </>
    )
}
