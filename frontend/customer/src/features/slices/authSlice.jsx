import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser(state, action) {
            state.userInfo = action.payload;
            state.isAuthenticated = true;
        },
        logoutUser(state) {
            state.userInfo = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
