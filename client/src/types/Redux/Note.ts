import { NotesEntity } from 'types';

export interface NotesState {
    notes: NotesEntity[] | [];
    status: null | boolean;
}

export interface SetNotes {
    payload: NotesEntity[] | [];
}

export interface AddNote {
    payload: NotesEntity;
}

export interface EditNoteEntity {
    id: string;
    text: string;
}
