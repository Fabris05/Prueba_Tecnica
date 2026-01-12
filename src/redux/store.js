import { configureStore } from "@reduxjs/toolkit";
import { countriesApi } from "../services/countriesApi";
import { journalsApi } from "../services/journalsApi";

export const store = configureStore({
    reducer: {
        [countriesApi.reducerPath]: countriesApi.reducer,
        [journalsApi.reducerPath]: journalsApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(countriesApi.middleware, journalsApi.middleware),
});
