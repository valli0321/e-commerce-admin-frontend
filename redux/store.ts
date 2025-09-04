'use client'

import { configureStore } from "@reduxjs/toolkit";
import storeMoalReducer from './slices/storeModalSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        storeModal: storeMoalReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;