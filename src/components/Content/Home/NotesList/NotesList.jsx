import {NoteElement} from "./NoteElement/NoteElement";
import './NotesList.css';

export const NotesList = props => {
    localStorage.setItem('notes', JSON.stringify(props.notes));

    const notes = [...props.notes].reverse();

    return (
       <div className="notes-list">
           <p className="notes-header">Notes List</p>
           {notes.length
               ? notes.map((note) => {
                    return <NoteElement key={note.id} {...note} deleteNote={props.deleteNote} />
                 })
               : <p className="no-notes-text">No notes.</p>
           }
       </div>
    );
}
