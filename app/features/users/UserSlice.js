import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logout = createAsyncThunk(
    'users/logout',
    async(obj, thunkAPI) => {
        try {
            await AsyncStorage.removeItem('userInfo');

            return thunkAPI.fulfillWithValue(true);
        } catch(e) {
            return thunkAPI.fulfillWithValue(true);
        }
    }
);

export const loginFromStorage = createAsyncThunk(
    'users/loginFromStorage',
    async(obj, thunkAPI) => {
        try {
            const jsonValue = await AsyncStorage.getItem('userInfo')
            const userInfoStorage = jsonValue != null ? JSON.parse(jsonValue) : null;
            if(userInfoStorage){
                console.log('from storage',userInfoStorage);
                return userInfoStorage;
            }else{
                return thunkAPI.rejectWithValue(userInfoStorage);
            }
        } catch(e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'users/login',
    async({ email, password }, thunkAPI) => {
        try{
            const response = await fetch(
                'https://zippgrocery.com/wp-json/jwt-auth/v1/token',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username:email, password
                    })
                }
            );
            let data = await response.json();

            console.log('login response: ', data);
            if(response.status === 200 ){
                try {
                    await AsyncStorage.setItem(
                    'userInfo',
                        JSON.stringify(data)
                    );
                }catch(e){
                    console.log('Async storage: ',e);
                }
                return data
            }else{
                return thunkAPI.rejectWithValue(data)
            }
        }catch(e){
            console.log('login error:',e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const userSlicer = createSlice({
    name: 'users',
    initialState: {
        isLoading: false,
        userInfo: false,
        error: ''
    },
    reducers: {
        /* logout: (state) => {
            state.isLoading = false;
            state.userInfo = false;
            state.error = '';
        } */
    },
    extraReducers: {
        [loginUser.pending]:(state) => {
            state.isLoading = true;
        },
        [loginUser.fulfilled]:(state, { payload }) => {
            state.isLoading = false;
            state.userInfo = payload;
            state.error = '';
        },
        [loginUser.rejected]:(state, { payload }) => {
            state.isLoading = false;
            state.userInfo = false;
            state.error = payload;
        },
        
        [loginFromStorage.pending]:(state) => {
            state.isLoading = true;
        },
        [loginFromStorage.fulfilled]:(state, { payload }) => {
            state.isLoading = false;
            state.userInfo = payload;
            state.error = '';
        },
        [loginFromStorage.rejected]:(state, { payload }) => {
            state.isLoading = false;
            state.userInfo = false;
            state.error = payload;
        },

        [logout.pending]:(state) => {
            state.isLoading = true;
        },
        [logout.fulfilled]:(state, { payload }) => {
            state.isLoading = false;
            state.userInfo = false;
            state.error = '';
        }
    }
});
/* export const { logout } = userSlicer.actions; */