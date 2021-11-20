import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getNotifications = createAsyncThunk(
    'notifications/get', 
    async (obj, { dispatch, getState, fulfillWithValue, rejectWithValue }) => {
        const token = getState().user.userInfo.token;
        try{
            const response = await fetch(
                "https://zippgrocery.com/wp-json/wcfmmp/v1/notifications/",
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

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        isNotificationsLoading: false,
        notifications: false,
        error: ''
    },
    reducers: {

    },
    extraReducers: {
        [getNotifications.pending]: (state) => {
            state.isNotificationsLoading = true;
        },
        [getNotifications.fulfilled]: (state, {payload}) => {
            state.isNotificationsLoading = false;
            state.notifications = payload;
            state.error = '';
        },
        [getNotifications.rejected]: (state, {payload}) => {
            state.isNotificationsLoading = false;
            state.error = payload;
        },
    }
});

export default notificationsSlice.reducer; 