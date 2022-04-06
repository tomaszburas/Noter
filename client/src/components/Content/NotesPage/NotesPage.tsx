import { Form } from './Form/Form';
import { NotesList } from './NotesList/NotesList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from 'react-spinners/GridLoader';
import { NoteRecordEntity } from 'types';

interface Props {
    notes: NoteRecordEntity[] | [];
    setNotes: (NoteRecordEntity: NoteRecordEntity[] | []) => void;
    addNote: (text: string) => void;
    deleteNote: (id: string) => void;
    editNote: (id: string, text: string) => void;
    auth: boolean;
}

export const NotesPage = (props: Props) => {
    const navigate = useNavigate();

    useEffect(() => {
        !props.auth && navigate('/sign-in');
    }, [props.auth]);

    return (
        <>
            {props.auth ? (
                <>
                    <Form addNote={props.addNote} />
                    <NotesList
                        notes={props.notes}
                        deleteNote={props.deleteNote}
                        editNote={props.editNote}
                    />
                </>
            ) : (
                <Loader
                    css={
                        {
                            position: 'absolute',
                            top: '50%',
                            right: '50%',
                        } as any
                    }
                    color="#19535f"
                />
            )}
        </>
    );
};
