import React from 'react';
import { Form } from './Form/Form';
import { NotesList } from './NotesList/NotesList';
import { Navigate } from 'react-router-dom';
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
                <Navigate replace to="/sign-in" />
            )}
        </>
    );
};
