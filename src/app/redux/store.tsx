import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
const reducers = combineReducers({
    cart: cartSlice,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, reducers);

// Configure store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }) as ReturnType<typeof getDefaultMiddleware>, // Cast the middleware type to match expectations
});

export const persistor = persistStore(store);


