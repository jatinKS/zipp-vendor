import React from 'react';
import { View, StyleSheet, Button, ScrollView, Image, TouchableWithoutFeedback, FlatList } from 'react-native';
import { ScreenContainer, Card, TransButtonEl } from '../components/elements';
import { FontAwesome, Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { Title, Subheading, Text } from 'react-native-paper';
import { ucwords } from '../components/elements';

const OrderDetails = ({ navigation, route }) => {
    const order = route.params.order;

    const orderDate = new Date(order.date_created);
    const [orderDateMonth, orderDateDay, orderDateYear]       = [orderDate.getMonth(), orderDate.getDate(), orderDate.getFullYear()];
    const [orderDateHour, orderDateMinutes, orderDateSeconds] = [orderDate.getHours(), orderDate.getMinutes(), orderDate.getSeconds()];

    let billingAddress = {};
    billingAddress.name = order.billing.first_name+" "+order.billing.last_name;
    
    billingAddress.address = 
        order.billing.company !=='' ? 
        order.billing.company+", ":"";
    
    billingAddress.address += 
        order.billing.address_1 !=='' ? 
        order.billing.address_1+", ":"";
    
    billingAddress.address += 
        order.billing.address_2 !=='' ? 
        order.billing.address_2+", ":"";
    
    billingAddress.address += 
        order.billing.city !=='' ? 
        order.billing.city+", ":"";
    
    billingAddress.address += 
        order.billing.state !=='' ? 
        order.billing.state+", ":"";
    
    billingAddress.address += 
        order.billing.postcode !=='' ? 
        order.billing.postcode+", ":"";
    
    billingAddress.address += 
        order.billing.country !=='' ? 
        order.billing.country+", ":"";

    const shippingAddress = {};
    shippingAddress.name = order.shipping.first_name+" "+order.shipping.last_name;

    shippingAddress.address = 
        order.shipping.company !=='' ? 
        order.shipping.company+", ":"";
    
    shippingAddress.address += 
        order.shipping.address_1 !=='' ? 
        order.shipping.address_1+", ":"";
    
    shippingAddress.address += 
        order.shipping.address_2 !=='' ? 
        order.shipping.address_2+", ":"";
    
    shippingAddress.address += 
        order.shipping.city !=='' ? 
        order.shipping.city+", ":"";
    
    shippingAddress.address += 
        order.shipping.state !=='' ? 
        order.shipping.state+", ":"";
    
    shippingAddress.address += 
        order.shipping.postcode !=='' ? 
        order.shipping.postcode+", ":"";
    
    shippingAddress.address += 
        order.shipping.country !=='' ? 
        order.shipping.country+", ":"";

        const orderEmail = order.shipping.email? order.shipping.email :order.billing.email;
        const orderPhone = order.shipping.phone? order.shipping.phone :order.billing.phone;

    return (
        <ScreenContainer style={styles.container}>
            <ScrollView>
                <TouchableWithoutFeedback>
                    <View>
                        <Card style={styles.cardContainer}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Title>Order #{order.id}</Title>
                                <View style={{padding: 5, borderRadius: 10,backgroundColor: 'green'}}>
                                    <Text style={{color: '#fff', fontSize: 12}}>{ucwords(order.status)}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', paddingVertical: 5, borderBottomColor: '#eee',borderBottomWidth: 2, marginBottom: 5}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Feather name="clock" size={20} color="black" />
                                    <Text style={{ paddingLeft: 10}}>{orderDate.toString()/* 14 Oct 2021 | 09:03AM */}</Text>
                                </View>
                            </View>
                            <View>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Ionicons name="location-sharp" size={24} color="black" />
                                    <Text>Delivery Location:</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', padding: 5, marginBottom: 5}}>
                                <FontAwesome name="money" size={20} color="black" />
                                <View style={{flex: 1, flexDirection: 'row', paddingLeft: 10 }}>
                                    <Text style={{ flexWrap: 'wrap', fontSize: 15}}>{'Payment via '+order.payment_method_title}</Text>
                                </View>
                            </View>
                        </Card>
                        <Card style={styles.cardContainer}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 7, marginBottom: 7}}>
                                <View style={{flexGrow:1}}>
                                    <View style={{borderBottomColor: '#eee', borderBottomWidth: 2, paddingBottom: 7, marginBottom: 7}}>
                                        <Title>Shipping Details</Title>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Subheading style={{flex: 1, flexWrap: 'wrap'}}>{shippingAddress.name}</Subheading>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{flex: 1, flexWrap: 'wrap'}}>{shippingAddress.address}</Text>
                                    </View>
                                </View>
                                <View style={{flexGrow:1}}>
                                    <View style={{borderBottomColor: '#eee', borderBottomWidth: 2, paddingBottom: 7, marginBottom: 7}}>
                                        <Title>Billing Details</Title>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Subheading style={{flex: 1, flexWrap: 'wrap'}}>{billingAddress.name}</Subheading>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{flex: 1, flexWrap: 'wrap'}}>{billingAddress.address}</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <MaterialIcons name="email" size={24} color="black" />
                                    <Text style={{paddingLeft: 10}}>{orderEmail}</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <FontAwesome name="phone" size={24} color="black" />
                                    <Text style={{paddingLeft: 10}}>{orderPhone}</Text>
                                </View>
                            </View>
                        </Card>
                        <Card style={styles.cardContainer}>
                            <Title>Order Items</Title>
                            <View style={{marginVertical: 5,paddingVertical: 5, borderTopWidth: 2, borderTopColor: '#eee'}}>
                                {order.line_items.map((item,index)=>(
                                    <View key={index} style={{...styles.rowConEnd, borderBottomColor: '#eee', borderBottomWidth: 2, marginVertical: 5, paddingBottom: 5}}>
                                        <View style={{justifyContent: 'center',alignItems: 'center'}}>
                                            <Image 
                                                source={{
                                                    uri: item.image_url,
                                                }}
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    resizeMode: 'contain' 
                                                }}
                                            />
                                        </View>
                                        <View style={{flex: 1,flexDirection: 'row', paddingHorizontal: 5}}>
                                            <Subheading style={{flexWrap: 'wrap', }}>{item.name}</Subheading>
                                        </View>
                                        <View style={{}}>
                                            <Text>Price: ${item.price.toFixed(2)} X {item.quantity}</Text>
                                            <Text>Total: ${parseFloat(item.subtotal).toFixed(2)}</Text>
                                            {/* <Text>Fees: ${item.commission_value.toFixed(2)}</Text> */}
                                        </View>
                                    </View>    
                                ))}       
                            </View>
                        </Card>
                        <Card style={styles.cardContainer}>
                            <Title>Order Total</Title>
                            <View style={{marginVertical: 5,paddingVertical: 5, borderTopWidth: 2, borderTopColor: '#eee'}}>
                                <View style={styles.rowConEnd}>
                                    <Subheading>Subtotal:</Subheading>
                                    <Subheading>${order.total}</Subheading>
                                </View>
                                <View style={styles.rowConEnd}>
                                    <Subheading>Shipping:</Subheading>
                                    <Subheading>${order.shipping_total}</Subheading>
                                </View>
                                <View style={styles.rowConEnd}>
                                    <Subheading>Tax:</Subheading>
                                    <Subheading>${order.total_tax}</Subheading>
                                </View>
                                {/* <View style={styles.rowConEnd}>
                                    <Subheading>Total Earning:</Subheading>
                                    <Subheading>$42.02</Subheading>
                                </View> */}
                            </View>
                        </Card>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardTitle: {
        fontWeight: '700',
        fontSize: 17,
        color: '#494949',
        marginVertical: 5
    },
    cardContainer: {
        padding: 10,
        marginVertical: 7,
        flex: 1
    },
    rowConEnd: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

export default OrderDetails;