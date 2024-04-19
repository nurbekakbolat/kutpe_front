import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { User } from './types';
import { client } from '../../client';

const initialState: User = {
    is_superuser: false,
    username: '',
    first_name: '',
    last_name: '',
    phone_number: ''
}


export const fetchUserDetails = createAsyncThunk(
    'user/fetchDetails',
    async () => {
        try {
            const response = await client.get("auth/user/");
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            const data = await response.data.json();
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (_state, action: PayloadAction<User>) => {
            return action.payload;
        }
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                return { ...state, ...action.payload };
            });
    }
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;