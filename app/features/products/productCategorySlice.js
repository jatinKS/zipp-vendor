import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProductCategories = createAsyncThunk(
    'products/getProductCategories',
    async ( obj, { dispatch, getState, fulfillWithValue, rejectWithValue } ) => {
        const token = getState().user.userInfo.token;
        
        try{
            const response = await fetch(
                "https://zippgrocery.com/wp-json/wc/v3/products/categories",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                }
            );
            let data = await response.json();
    
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

const productCategoriesSlice = createSlice({
    name: 'productCategories',
    initialState: {
        isProductCategoryLoadidng: false,
        productCategories: false,
        error: ''
    },
    reducers: {

    },
    extraReducers: {
        [getProductCategories.pending]: (state) => {
            state.isProductCategoryLoadidng = true
            state.productCategories = false;
        },
        [getProductCategories.fulfilled]:(state, { payload }) => {
            state.isProductCategoryLoadidng = false;
            state.productCategories = payload;
        },
        [getProductCategories.rejected]:(state, { payload }) => {
            state.isProductCategoryLoadidng = false;
            state.error = payload;
        }
    }
});

export default productCategoriesSlice.reducer;