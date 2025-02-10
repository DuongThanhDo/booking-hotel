import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    roomData: null,
    nonRepeatRoomType: null,
};

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        getNonRepeatRoomType(state, action) {
            state.nonRepeatRoomType = action.payload;
        },
    },
});

export const { getNonRepeatRoomType } = roomSlice.actions;
export default roomSlice.reducer;
