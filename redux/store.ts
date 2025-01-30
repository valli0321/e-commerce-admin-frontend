'use client'

import { configureStore } from "@reduxjs/toolkit";
import storeMoalReducer from './slices/storeModalSlice';

export const store = configureStore({
    reducer: {
        storeModal: storeMoalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;