import { createSlice } from '@reduxjs/toolkit';
import type { ActiveTab } from './types';

const initialState: ActiveTab = {
    activeTab: 'home'
}

export const tabsSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        }
    }
})

export const { setActiveTab } = tabsSlice.actions;

export default tabsSlice.reducer;