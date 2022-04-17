import { configureStore } from '@reduxjs/toolkit';
import { notesSlice } from '../features/notes-slice';
import { usersSlice } from '../features/users-slice';

export const store = configureStore({
    reducer: {
        user: usersSlice.reducer,
        note: notesSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
