import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ScreenContainer, ButtonEl, TransButtonEl } from '../components/elements';
import { Modal, Portal, RadioButton, Provider } from 'react-native-paper';

import { useSelector, useDispatch } from 'react-redux';
import { getProductCategories } from '../app/features/products/productCategorySlice';
import { ActivityIndicator } from 'react-native-paper';
import { WebView } from 'react-native-webview';
const ProductDetails = ({ navigation, route }) => {
    const product = route.params.product;
    const productType = product.type;


    const { isProductCategoryLoadidng, productCategories, error } = useSelector( state => state.productCategories );
    const dispatch = useDispatch();

    const getCateogories = () => {
        dispatch(getProductCategories());
    }

    const [visible, setVisible] = React.useState(false);
    const showModal = () => {
        getCateogories();
        setVisible(true);
    }
    const hideModal = () => setVisible(false);
    const containerStyle = {flex: 1,backgroundColor: 'white', margin: 20,padding: 20};

    const [category, setCategory] = React.useState([]);

    const toggleSelect = (value) => {
        //let listCheck = category.includes(value);
        let listCheck = category.some( cat => cat.id === value.id)

        if(listCheck){
            let newValue = category.filter(val => val.id !== value.id);
            setCategory(newValue);
        }else{
            setCategory([...category, value]);
        }
    }

    const [formFields, setFormFields] = useState({
        productName: product.name,
        regularPrice: product.price,
        salePrice: product.sale_price,
    }); 
    console.log(formFields);
    /* 
        variable
        simple 
    */

    return (
        <ScreenContainer>
            <TextInput
                mode="flat"
                label="Product Name"
                style={styles.inputStyle}
                value={formFields.productName}
                onChangeText={(e)=>{
                    setFormFields(preState => {
                        return {...preState,productName:e}
                    })
                }}
            />
            <TextInput
                mode="flat"
                label="Regular Price"
                style={styles.inputStyle}
                keyboardType='numeric'
                value={formFields.regularPrice.toString()}
                onChangeText={(e)=>{
                    setFormFields(preState => {
                        return {...preState,regularPrice:e}
                    })
                }}
            />
            <TextInput
                mode="flat"
                label="Sale Price"
                style={styles.inputStyle}
                keyboardType='numeric'
                value={formFields.salePrice.toString()}
                onChangeText={(e)=>{
                    setFormFields(preState => {
                        return {...preState,salePrice:e}
                    })
                }}
            />
            <TextInput
                mode="flat"
                label="Short Description"
                multiline={true}
                style={{...styles.inputStyle, minHeight: 100}}
            />
            <View style={{flexDirection: 'row',}}>
                <TransButtonEl 
                    label='Select Category'
                    onPress={showModal}
                    color='red'
                    style={{...styles.categoryStyle}}
                />
                <View style={{flex: 1,padding: 7}}>
                    {category.map(cat=><Text>{cat.name}</Text>)}
                </View>
            </View>
            <Text style={{color: '#777'}}>Note: Only Simple Products can be created in this page. To create other product types login through the website.</Text>
            <ButtonEl 
                label='Update Product'
                onPress={hideModal}
                style={styles.createProductButton}
            />
            <Provider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        {isProductCategoryLoadidng &&  <ActivityIndicator animating={true} /> }

                        {productCategories && (
                            <View style={{flex: 1}}>
                                <RadioButton.Group multiline onValueChange={value => toggleSelect(value)}>
                                    <ScrollView>
                                    {
                                        productCategories.map((itemCat,index)=>(
                                            <RadioButton.Item key={index} status={ category.some( cat => cat.id === itemCat.id ) ? 'checked' : 'unchecked' } label={itemCat.name} value={itemCat} />
                                            ))
                                        }
                                    </ScrollView>
                                </RadioButton.Group>
                                <ButtonEl 
                                    label='Close'
                                    onPress={hideModal}
                                    style={{...styles.categoryStyle,...styles.centerButtonBottom}}
                                />
                            </View>
                        )}
                    </Modal>
                </Portal>
            </Provider>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputStyle: {
        marginHorizontal: 5,
        marginVertical: 10,
        backgroundColor: '#fff'
    },
    categoryStyle: {
        flex:1,
        justifyContent: 'center',
        marginHorizontal: 5,
        marginVertical: 10,
        height: 45,
        borderRadius: 100,
    },
    halfButtonLeft: {
        width: '50%',
        alignSelf: 'flex-start',
    },
    centerButtonBottom: {
        width: '50%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
    },
    createProductButton: {
        width: '50%',
        padding: 5,
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 100
    }
});
export default ProductDetails;