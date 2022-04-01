import {Form} from "./Form/Form";
import {NotesList} from "./NotesList/NotesList";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Loader from "react-spinners/GridLoader";

export const NotesApp = props => {
    const navigate = useNavigate();

    useEffect(() => {
        !props.auth && navigate('/sign-in');
    }, [props.auth])

    return (
        <>
            {
                props.auth
                    ? <>
                        <Form addNote={props.addNote}/>
                        <NotesList notes={props.notes} deleteNote={props.deleteNote} editNote={props.editNote}/>
                    </>
                    : <Loader
                        css={{position: 'absolute', top: '50%', right: '50%'}}
                        color='#19535f'
                    />
            }
        </>
    )
}
