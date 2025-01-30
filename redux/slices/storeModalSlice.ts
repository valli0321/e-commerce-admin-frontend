import { createSlice } from "@reduxjs/toolkit";

interface StoreModalState {
    isOpen: boolean;
}

const initialState: StoreModalState = {
    isOpen: false,
};

const storeModalSlice = createSlice({
    name: "storeModal",
    initialState,
    reducers: {
        onOpen: (state) => {
            state.isOpen = true;
        },
        onClose: (state) => {
            state.isOpen = false;
        },
    },
})

export const { onOpen, onClose } = storeModalSlice.actions;
export default storeModalSlice.reducer;