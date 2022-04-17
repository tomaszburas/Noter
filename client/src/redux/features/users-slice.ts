import { createSlice } from '@reduxjs/toolkit';
import { SetIsAuth, UserState } from '../../types/Redux/User';

const initialState: UserState = {
    isAuth: null,
};

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuth: (state, action: SetIsAuth) => {
            state.isAuth = action.payload;
        },
    },
});

export const { setIsAuth } = usersSlice.actions;
