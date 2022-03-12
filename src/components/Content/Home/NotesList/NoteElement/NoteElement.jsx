import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './NoteElement.css';

export const NoteElement = props => {
    return (
        <div className="notes-container">
            <div className="notes-left-box">
                <ReactMarkdown className="notes-text">{props.text}</ReactMarkdown>
                <Link className="notes-date" to={`/note/${props.id}`}>{props.date}</Link>
            </div>
            <div className="notes-right-box">
                <button className="notes-delete" onClick={e => props.deleteNote(props.id)} title="Delete note">Delete note</button>
            </div>
        </div>
    )
}
