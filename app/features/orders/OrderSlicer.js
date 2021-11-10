import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getOrders = createAsyncThunk(
    'orders/get',
    async (obj, { dispatch, getState, fulfillWithValue, rejectWithValue }) => {
        const token = getState().user.userInfo.token;
        try{
            const response = await fetch(
                "https://zippgrocery.com/wp-json/wcfmmp/v1/orders/?per_page=10&page=1",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                }
            );
            let data = await response.json();
            /* console.log('products',data); */
            if(response.status === 200 ){
                return data;
            }else{
                return thunkAPI.rejectWithValue(data);
            }
        }catch(e){
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        isOrderLoading: false,
        ordersDetails: false,
        error: ''
    },
    reducers: {

    },
    extraReducers: {
        [getOrders.pending]: (state) => {
            state.isOrderLoading = true;
        },
        [getOrders.fulfilled]: (state, {payload}) => {
            state.isOrderLoading = false;
            state.ordersDetails = payload;
            state.error = '';
        },
        [getOrders.rejected]: (state, {payload}) => {
            state.isOrderLoading = false;
            state.error = payload;
        },
    }
});

export default orderSlice.reducer;