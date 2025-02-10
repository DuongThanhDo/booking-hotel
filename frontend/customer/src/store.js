import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/slices/authSlice';
import cartReducer from './features/slices/cartSlice';
import roomReducer from './features/slices/roomSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        room: roomReducer,
    },
});

export default store;
