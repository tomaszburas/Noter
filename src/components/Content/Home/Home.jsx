import {Form} from "./Form/Form";
import {NotesList} from "./NotesList/NotesList";

export const Home = (props) => {
    return (
        <>
            <Form addNote={props.addNote} />
            <NotesList notes={props.notes} deleteNote={props.deleteNote}/>
        </>
    )
}
