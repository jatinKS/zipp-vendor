import React,{ useEffect } from 'react';
import { StyleSheet, View, Button, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";
import { logout } from '../app/features/users/UserSlice';
import { getOrders } from '../app/features/orders/OrderSlicer';
import { Surface } from 'react-native-paper';

import { ScreenContainer, OrderEl } from '../components/elements';

const Orders = ({ navigation }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    const { ordersDetails } = useSelector(state => state.orders );

    const orders = ordersDetails;

    useEffect(()=>{
        dispatch(getOrders());
    },[isFocused]);
   
    const renderItem = ({ item }) => { 
        const orderObj = {
            orderId: item.id,
            status: item.status,
            items: item.line_items,
            time: item.date_created
        }
        return (
            <OrderEl order={orderObj} onPress={ () => {
                navigation.push('Order Details', { order: item });
            }} />
        );
    };
    const x = [
        {id: 1}
    ]
    return (
        <View style={{ flex: 1/* , alignItems: 'center', justifyContent: 'center' */ }}>
            <View style={{flexDirection: 'row'}}>
                <TextInput style={{ 
                    flexGrow:1, backgroundColor: '#fff', paddingHorizontal: 5 ,
                    fontSize: 20
                }}/>
                <TouchableOpacity style={{
                    backgroundColor: '#fff',
                    paddingHorizontal: 5,
                    paddingVertical: 3
                }}>
                    <FontAwesome name="search" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <ScreenContainer>
                <FlatList
                    data={orders}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </ScreenContainer>
        </View>
      );
}

const styles = StyleSheet.create({
    
});
 
export default Orders;