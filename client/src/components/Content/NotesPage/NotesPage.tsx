import { Form } from './Form/Form';
import { NotesList } from './NotesList/NotesList';
import { NotesEntity } from 'types';

interface Props {
    notes: NotesEntity[] | [];
    setNotes: (NoteRecordEntity: NotesEntity[] | []) => void;
    addNote: (text: string) => void;
    deleteNote: (id: string) => void;
    editNote: (id: string, text: string) => void;
}

export const NotesPage = (props: Props) => {
    return (
        <>
            <Form addNote={props.addNote} />
            <NotesList
                notes={props.notes}
                deleteNote={props.deleteNote}
                editNote={props.editNote}
            />
        </>
    );
};
