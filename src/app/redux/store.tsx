// src/app/redux/store.tsx

import { combineReducers, configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "./cartSlice";

// Persist configuration
const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

// Combine reducers
const rootReducer = combineReducers({
    cart: cartSlice,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with correct middleware handling
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }) as MiddlewareArray<any>,
});

export const persistor = persistStore(store);
