import { configureStore } from '@reduxjs/toolkit'
import { userSlicer } from './features/users/UserSlice';
import productReducer from './features/products/ProductSlice';
import orderReducer from './features/orders/OrderSlicer';
import productCategoryReducer from './features/products/productCategorySlice';

export const store = configureStore({
    reducer: {
        user: userSlicer.reducer,
        products: productReducer,
        orders: orderReducer,
        productCategories: productCategoryReducer
    },
})