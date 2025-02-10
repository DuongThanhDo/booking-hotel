import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartData: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart(state, action) {
            state.cartData.push(action.payload);
        },
        removeCart(state, action) {
            state.cartData.splice(action.payload, 1);
        },
        updatePaymentStatus(state, action) {
            const { index } = action.payload;
            state.cartData[index].paymentStatus = !state.cartData[index].paymentStatus;
        },
    },
});

export const { addCart, removeCart, updatePaymentStatus } = cartSlice.actions;
export default cartSlice.reducer;
