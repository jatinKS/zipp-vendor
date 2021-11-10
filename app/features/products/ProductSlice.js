import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
/* 
    td: token check and logout if invalid
*/
export const getProducts = createAsyncThunk(
    'products/get',
    async ( obj, { dispatch, getState, fulfillWithValue, rejectWithValue } ) => {
        const token = getState().user.userInfo.token;
        
        /* const url = `https://zippgrocery.com/wp-json/wcfmmp/v1/products/${obj.productId}`;
        console.log('url',url); */

        try{
            const response = await fetch(
                "https://zippgrocery.com/wp-json/wcfmmp/v1/products/",
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

const productSlice = createSlice({
    name: 'products',
    initialState: {
        isProductLoadidng: false,
        productsDetails: false,
        error: ''
    },
    reducers: {

    },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.isProductLoadidng = true;
        },
        [getProducts.fulfilled]:(state, { payload }) => {
            state.isProductLoadidng = false;
            state.productsDetails = payload;
        },
        [getProducts.rejected]:(state, { payload }) => {
            state.isProductLoadidng = false;
            state.error = payload;
        },
    }
});

export default productSlice.reducer;