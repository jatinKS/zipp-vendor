import React,{ useEffect } from 'react';
import { StyleSheet, View, Button, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";
import { logout } from '../app/features/users/UserSlice';
import { getProducts } from '../app/features/products/ProductSlice';
import { Surface } from 'react-native-paper';

import { ScreenContainer, ProductEl } from '../components/elements';


  
const Products = ({ navigation }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    const { productsDetails } = useSelector(state => state.products );

    const products = productsDetails;

    const logougHandler = () => {
        dispatch(logout());
    }
    
    useEffect(()=>{
        dispatch(getProducts());
    },[isFocused]);
   
    const renderItem = ({ item }) => { 
        if(item.images && item.images.length){   
            var url = item.images[0].src;
        } else {
            var url = null;
        }
        const productObj = {
            name: item.name,
            image: url,
            price: item.price
        }
        return (
            <ProductEl product={productObj} onPress={ () => {
                navigation.push('Product Details', { product: item});
            }}/>
        );
    };

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
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                <SafeAreaView>
                    <TouchableOpacity onPress={() => {
                        navigation.push('Create Product');
                    }}>
                        <View style={{
                            backgroundColor: '#20a8d8',
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 1,
                            right: 1,
                            margin: 10
                        }}><Text style={{color: '#fff', fontSize: 30}}>+</Text></View>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScreenContainer>
        </View>
      );
}

const styles = StyleSheet.create({
    
});
 
export default Products;