import './NoteElement.css';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export const NoteElement = props => {
    return (
        <div className="notes-container">
            <div className="notes-left-box">
                <ReactMarkdown className="notes-text">{props.note}</ReactMarkdown>
                <p className="notes-date">{props.date}</p>
            </div>
            <div className="notes-right-box">
                <Link className="show-note__btn" to={`/notes/${props.id}`}>
                    <button title="Delete note">Show</button>
                </Link>
            </div>
        </div>
    )
}
