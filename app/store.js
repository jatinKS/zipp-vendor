import { configureStore } from '@reduxjs/toolkit'
import { userSlicer } from './features/users/UserSlice';
import productReducer from './features/products/ProductSlice';
import orderReducer from './features/orders/OrderSlicer';
import productCategoryReducer from './features/products/productCategorySlice';
import notificationsReducer from './features/notification/notificationsSlice';
import { UserSettingsSlicer } from './features/users/UserSettingsSlice';

export const store = configureStore({
    reducer: {
        user: userSlicer.reducer,
        products: productReducer,
        orders: orderReducer,
        productCategories: productCategoryReducer,
        userSettings: UserSettingsSlicer.reducer,
        notifications: notificationsReducer
    },
})