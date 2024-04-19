import { configureStore } from "@reduxjs/toolkit/react";

import tabsReducer from "./slices/tabsSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        tabs: tabsReducer,
        user: userReducer
    },
    });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;