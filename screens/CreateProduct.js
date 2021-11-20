import React,{ useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ScreenContainer, ButtonEl, TransButtonEl } from '../components/elements';
import { Modal, Portal, RadioButton, Provider } from 'react-native-paper';

import { useSelector, useDispatch } from 'react-redux';
import { createProducts } from '../app/features/products/ProductSlice';
import { getProductCategories } from '../app/features/products/productCategorySlice';
import { ActivityIndicator } from 'react-native-paper';


const CreateProduct = ({navigation}) => {
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
        productName: '',
        regularPrice: '',
        salePrice: '',
        shortDescription: ''
    });

    const [errorMsg, setErrorMsg] = useState({
        productNameError: false,
        regularPriceError: false,
        salePriceError: false,
        shortDescriptionError: false,
    });

    const onSubmitHandler = () => {
        //validate
        setErrorMsg({
            productNameError: false,
            regularPriceError: false,
            salePriceError: false,
            shortDescriptionError: false,
        });

        if(formFields.productName === ''){
            setErrorMsg(preState => {
                return {...preState,productNameError:'Product name cannot be empty'}
            });
        }

        if(formFields.regularPrice === '' || isNaN(formFields.regularPrice)){
            setErrorMsg(preState => {
                return {...preState,regularPriceError:'Enter a valid regular price'}
            });
        }

        if(isNaN(formFields.salePrice)){
            setErrorMsg(preState => {
                return {...preState,salePriceError:'Enter a valid sale price'}
            });
        }

        if(formFields.shortDescription === ''){
            setErrorMsg(preState => {
                return {...preState,shortDescriptionError:'Enter a short description'}
            });
        }


        if( errorMsg.productNameError ||
            errorMsg.regularPriceError ||
            errorMsg.salePriceError ||
            errorMsg.shortDescriptionError )
        {
            console.log('some error');
            return false;
        }else{
            console.log('not error');
        }


        const productCategories = category.map(cat=>{
            return {
                "id": cat.id,
                "name":cat.name,
                "slug":cat.slug        
            }
        });

        const productObj = {
            'name': formFields.productName,
            'price': formFields.regularPrice,
            "regular_price": formFields.regularPrice,
            'sale_price': formFields.salePrice,
            'short_description': formFields.shortDescription,
            'type': "simple",
            'categories': productCategories,
            "status": "pending",
            "meta_data": [
                {
                    "key": "product_by_app",
                    "value": "yes"
                },
            ],
        }

        console.log('new products',productObj);

        dispatch(createProducts(productObj));
        
    }

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
            <Text style={styles.errorStyle}>{errorMsg.productNameError}</Text>
            <TextInput
                mode="flat"
                label="Regular Price"
                style={styles.inputStyle}
                keyboardType='numeric'
                value={formFields.regularPrice}
                onChangeText={(e)=>{
                    setFormFields(preState => {
                        return {...preState,regularPrice:e}
                    })
                }}
            />
            <Text style={styles.errorStyle}>{errorMsg.regularPriceError}</Text>
            <TextInput
                mode="flat"
                label="Sale Price"
                style={styles.inputStyle}
                keyboardType='numeric'
                value={formFields.salePrice}
                onChangeText={(e)=>{
                    setFormFields(preState => {
                        return {...preState,salePrice:e}
                    })
                }}
            />
            <Text style={styles.errorStyle}>{errorMsg.salePriceError}</Text>
            <TextInput
                mode="flat"
                label="Short Description"
                multiline={true}
                style={{...styles.inputStyle, minHeight: 100}}
                value={formFields.shortDescription}
                onChangeText={(e)=>{
                    setFormFields(preState => {
                        return {...preState,shortDescription:e}
                    })
                }}
            />
            <Text style={styles.errorStyle}>{errorMsg.shortDescriptionError}</Text>
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
                label='Create Product'
                onPress={onSubmitHandler}
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
        backgroundColor: '#fff',
        marginBottom: 0
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
    },
    errorStyle: {
        color: 'red',
        marginLeft: 7,
        marginTop:0,
        marginBottom: 5,
        fontSize: 12
    }
});

export default CreateProduct;

