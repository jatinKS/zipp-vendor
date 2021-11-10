import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Orders from '../screens/Orders';
import Products from '../screens/Products';

import OrderDetails from '../screens/OrderDetails';
import ProductDetails from '../screens/ProductDetails';
import CreateProduct from '../screens/CreateProduct';
import { DrawerContent } from './DrawerContent';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function MainDrawer() {
    return (
        <Drawer.Navigator  initialRouteName="Orders" drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Orders" component={Orders} />
            <Drawer.Screen name="Products" component={Products} />
        </Drawer.Navigator>
    );
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Drawer"
                screenOptions={({ route, navigation }) => ({
                    headerBackTitleVisible: false,
                })}
            >
                <Stack.Screen 
                    name="Drawer" 
                    component={MainDrawer} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Order Details" 
                    component={OrderDetails}
                    options={{
                        headerBackTitle: null,
                    }}
                />
                <Stack.Screen 
                    name="Product Details" 
                    component={ProductDetails}
                    options={{
                        headerBackTitle: null,
                    }}
                />
                <Stack.Screen 
                    name="Create Product" 
                    component={CreateProduct}
                    options={{
                        headerBackTitle: null,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigation;