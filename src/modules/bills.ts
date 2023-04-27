import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TBill, TGetBillsMode } from "../models/TBill";
import { addBill, getBills, getExpiredBills, getValidBills, isExistingBill, updateBill } from "../apis/firestore-bills";


// %%% Models %%%

// Type of Thunk Error
type TThunkError = { err_msg: string }

// Type of State
type TStateBills = {
    loading: boolean;
    error: null | undefined | TThunkError;
    payload: TBill[]
}

// %%% Initial State %%%
const initialState: TStateBills = {
    loading: false,
    error: null,
    payload: []
}

// %%% Define Thunk %%%

/**
 * This thunk get bills which is conditioned by mode: string
 * @param {string} mode mode='valid': get all valid bills; mode='expired': get all expired bills; mode='all': get all bills; 
 */
const getBillsThunk = createAsyncThunk<TBill[], TGetBillsMode, { rejectValue: TThunkError }>('bills/getBillsThunk', async (mode, thunkAPI) => {
    try {
        let bills: TBill[] = [];
        switch (mode) {
            case 'valid':
                bills = await getValidBills();
                break;
            case 'expired':
                bills = await getExpiredBills();
                break;
            case 'all':
            default:
                bills = await getBills();
                break;
        }
        return bills;
    } catch (err) {
        return thunkAPI.rejectWithValue({ err_msg: 'ERROR: Error occured in getBillsThunk()' });
    }
});

const updateBillThunk = createAsyncThunk<TBill[], TBill, { rejectValue: TThunkError }>('bills/updateBillThunk', async (bill, thunkAPI) => {
    try {
        const isExist = await isExistingBill(bill);
        if (isExist) {
            await updateBill(bill);
        } else {
            await addBill(bill);
        }
        return [bill];
    } catch (err) {
        return thunkAPI.rejectWithValue({ err_msg: 'ERROR: Error occured in addBillThunk()' });
    }
})

const sliceBills = createSlice({
    name: 'bills',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // getBillsThunk Actions
            .addCase(getBillsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBillsThunk.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = null;
                state.payload = payload;
            })
            .addCase(getBillsThunk.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            // updateBillThunk Actions
            .addCase(updateBillThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBillThunk.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = null;
                state.payload = payload;
            })
            .addCase(updateBillThunk.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
    }
})

const reducerBills = sliceBills.reducer;
export default reducerBills;

export { getBillsThunk, updateBillThunk };