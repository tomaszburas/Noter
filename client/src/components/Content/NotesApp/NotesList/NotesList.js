import './NotesList.css';
import {NoteElement} from "./NoteElement/NoteElement";

export const NotesList = props => {
    return (
       <div className="notes-list">
           <p className="notes-header">Notes List</p>
           {props.notes.length
               ? props.notes.map((note) => {
                    return <NoteElement key={note.id} {...note} deleteNote={props.deleteNote} editNote={props.editNote} />
                 })
               : <p className="no-notes-text">No notes.</p>
           }
       </div>
    );
}
