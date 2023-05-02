
// %%% Models %%%

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser } from "../models/TUser";
import { getUsers, setUsers, updateUser } from "../apis/firestore-users";

// Type of Thunk Error
type TThunkError = { err_msg: string }

// Type of State
type TStateUsers = {
    loading: boolean;
    error: null | undefined | TThunkError;
    payload: TUser[]
}

// %%% Initial State %%%
const initialState: TStateUsers = {
    loading: false,
    error: null,
    payload: []
}

// %%% Define Thunk %%%

const getUsersThunk = createAsyncThunk<TUser[], void, { rejectValue: TThunkError }>('users/getUsersThunk', async (empty, thunkAPI) => {
    try {
        const users = await getUsers();
        return users;
    } catch (err) {
        return thunkAPI.rejectWithValue({ err_msg: 'ERROR: Error occured in getUsersThunk()' });
    }
});

const setUsersThunk = createAsyncThunk<TUser[], TUser[], { rejectValue: TThunkError }>('users/addUserThunk', async (users, thunkAPI) => {
    try {
        await setUsers(users);
        console.log("LOG: Succeed to set all users");
        return users;
    } catch (err) {
        return thunkAPI.rejectWithValue({ err_msg: 'ERROR: Error occured in updateUserThunk(user)' });
    }
});

const updateUserThunk = createAsyncThunk<TUser[], TUser, { rejectValue: TThunkError }>('users/updateUserThunk', async (user, thunkAPI) => {
    try {
        await updateUser(user);
        return [user];
    } catch (err) {
        return thunkAPI.rejectWithValue({ err_msg: 'ERROR: Error occured in updateUserThunk(user)' });
    }
});

const sliceUsers = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // getUsersThunk Actions
            .addCase(getUsersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsersThunk.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = null;
                state.payload = payload;
            })
            .addCase(getUsersThunk.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            // setUsersThunk Actions
            .addCase(setUsersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(setUsersThunk.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = null;
                state.payload = payload;
            })
            .addCase(setUsersThunk.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            // updateUserThunk Actions
            .addCase(updateUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateUserThunk.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
    }
});

const reducerUsers = sliceUsers.reducer;
export default reducerUsers;

export { getUsersThunk, setUsersThunk, updateUserThunk };
