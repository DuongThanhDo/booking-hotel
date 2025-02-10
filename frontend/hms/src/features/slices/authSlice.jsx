import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    role: 'admin',
    userData: null,
    isAuthenticated: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginAdmin(state, action) {
            state.role = 'admin';
            state.userData = action.payload;
            state.isAuthenticated = true;
        },
        loginStaff(state, action) {
            state.role = 'staff';
            state.userData = action.payload;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.role = '';
            state.userData = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loginAdmin, loginStaff, logout } = authSlice.actions;

export default authSlice.reducer;
