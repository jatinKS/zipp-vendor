import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUserSettings = createAsyncThunk(
    'users/settings',
    async(obj, { dispatch, getState, fulfillWithValue, rejectWithValue}) => {
        const token = getState().user.userInfo.token;
        const store_id = getState().user.userInfo.store_id;
        try{
            const response = await fetch(
                `https://zippgrocery.com/wp-json/wcfmmp/v1/settings/id/${store_id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                }
            );
            let data = await response.json();
            /* console.log('usersettings: ',data); */
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

export const UserSettingsSlicer = createSlice({
    name: 'UserSettings',
    initialState: {
        isUserSettingsLoading: false,
        userSettings: false,
        error: ''
    },
    reducers: {

    },
    extraReducers: {
        [getUserSettings.pending]: (state) => {
            state.isUserSettingsLoading = true;
        },
        [getUserSettings.fulfilled]: (state, {payload}) => {
            state.isUserSettingsLoading = false;
            state.userSettings = payload;
            state.error = '';
        },
        [getUserSettings.rejected]: (state, {payload}) => {
            state.isUserSettingsLoading = false;
            state.error = payload;
        }
    }
});