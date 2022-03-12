import './Note.css';
import ReactMarkdown from "react-markdown";
import {Link, useParams, useNavigate} from 'react-router-dom';
import {useEffect} from "react";

export const Note = props => {
    const id = useParams().id;
    const note = props.notes.find(note => note.id === id);

    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/note/${id}`);
    }, [navigate, id]);

    const deleteNoteHandler = () => {
        props.deleteNote(id);
        navigate('/');
    }

    return (
        <>
            {note
                ? <>
                     <div className="note-nav">
                         <Link className="link" to='/'><span className="note-go-back__btn" title="Go back">Go Back</span></Link>
                         <button className="note-delete__btn" onClick={deleteNoteHandler} title="Delete note">Delete Note</button>
                     </div>
                     <div className="note-box">
                         <p className="note-header">Note</p>
                         <div className="note-content">
                             <ReactMarkdown>{note.text}</ReactMarkdown>
                             <p className="note-date">{note.date}</p>
                         </div>
                     </div>
                  </>
                : <>
                     <Link className="link" to='/'><span className="note-go-back__btn" title="Go back">Go Back</span></Link>
                     <div className="note-box">
                         <p className="note-box__text">There is no such note</p>
                     </div>
                  </>
            }
        </>
    )
}
