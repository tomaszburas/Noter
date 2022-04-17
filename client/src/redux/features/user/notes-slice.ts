import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EditNoteEntity, NotesState } from '../../../types/Redux/Note';
import { NotesEntity } from 'types';
import { createDate } from '../../../utils/createDate';

const initialState: NotesState = {
    notes: [],
    status: null,
};

export const getNotes: any = createAsyncThunk('notes/getNotes', async () => {
    const res = await fetch('/api/notes');
    const data = await res.json();

    if (data.success && data.notes.length) {
        return data.notes.map((note: NotesEntity) => ({
            ...note,
            date: createDate(note.createdAt),
        }));
    }
});

export const addNote: any = createAsyncThunk(
    'notes/addNote',
    async (text: string) => {
        const res = await fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        const data = await res.json();

        return {
            ...data.noteObj,
            date: createDate(data.noteObj.createdAt),
        };
    }
);

export const deleteNote: any = createAsyncThunk(
    'notes/deleteNote',
    async (id: string) => {
        await fetch(`/api/notes/${id}`, {
            method: 'DELETE',
        });

        return id;
    }
);

export const editNote: any = createAsyncThunk(
    'notes/editNote',
    async ({ id, text }: EditNoteEntity) => {
        await fetch(`/api/notes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, text }),
        });

        return { id, text };
    }
);

export const notesSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {},
    extraReducers: {
        [getNotes.fulfilled]: (state, action) => {
            state.status = true;
            state.notes = action.payload;
        },
        [addNote.fulfilled]: (state, action) => {
            state.notes = [action.payload, ...state.notes];
        },
        [deleteNote.fulfilled]: (state, action) => {
            state.notes = state.notes.filter(
                (notes) => notes.id !== action.payload
            );
        },
        [editNote.fulfilled]: (state, action) => {
            state.notes = state.notes.map((note) => {
                if (note.id === action.payload.id) {
                    note.text = action.payload.text;
                    return note;
                } else {
                    return note;
                }
            });
        },
    },
});
