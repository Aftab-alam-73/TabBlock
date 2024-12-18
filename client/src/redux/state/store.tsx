import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { apiSlice } from "../api/apiSlice";
import userReducer from "./userSlice";

// Configuration for redux-persist
const persistConfig = {
    key: "root", // Key for the persisted data in localStorage
    storage,     // Using localStorage
};

// Persisted reducer for the "user" slice
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        user: persistedUserReducer,           // Persisted user slice
        [apiSlice.reducerPath]: apiSlice.reducer, // API reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(apiSlice.middleware),
});

// Create the persistor to persist the store
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
