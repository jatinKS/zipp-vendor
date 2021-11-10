import React from 'react';
import { View, StyleSheet, Button, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { ScreenContainer, Card, TransButtonEl } from '../components/elements';
import { FontAwesome, Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { Title, Subheading, Text } from 'react-native-paper';

const OrderDetails = ({ navigation, route }) => {
    const order = route.params.order;
    console.log(orderId);
    const orderId = 21167;

    return (
        <ScreenContainer style={styles.container}>
            <ScrollView>
                <TouchableWithoutFeedback>
                    <View>
                        <Card style={styles.cardContainer}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Title>Order #{orderId}</Title>
                                <View style={{padding: 5, borderRadius: 10,backgroundColor: 'green'}}>
                                    <Text style={{color: '#fff', fontSize: 12}}>Completed</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', paddingVertical: 5, borderBottomColor: '#eee',borderBottomWidth: 2, marginBottom: 5}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Feather name="clock" size={20} color="black" />
                                    <Text style={{ paddingLeft: 10}}>14 Oct 2021 | 09:03AM</Text>
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
                                    <Text style={{ flexWrap: 'wrap', fontSize: 15}}>halkjfl al;dj lksjdf </Text>
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
                                        <Text style={{flex: 1, flexWrap: 'wrap'}}>c-16, Bhola nath nagar extn., Shahdara, Delhi 110032</Text>
                                    </View>
                                </View>
                                <View style={{flexGrow:1}}>
                                    <View style={{borderBottomColor: '#eee', borderBottomWidth: 2, paddingBottom: 7, marginBottom: 7}}>
                                        <Title>Billing Details</Title>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{flex: 1, flexWrap: 'wrap'}}>c-16, Bhola nath nagar extn., Shahdara, Delhi 110032</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <MaterialIcons name="email" size={24} color="black" />
                                    <Text style={{paddingLeft: 10}}>example@gmail.com</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <FontAwesome name="phone" size={24} color="black" />
                                    <Text style={{paddingLeft: 10}}>22387788</Text>
                                </View>
                            </View>
                        </Card>
                        <Card style={styles.cardContainer}>
                            <Title>Order Items</Title>
                            <View style={{marginVertical: 5,paddingVertical: 5, borderTopWidth: 2, borderTopColor: '#eee'}}>
                                <View style={{...styles.rowConEnd, borderBottomColor: '#eee', borderBottomWidth: 2, marginVertical: 5, paddingBottom: 5}}>
                                    <View style={{justifyContent: 'center',alignItems: 'center'}}>
                                        <Image 
                                            source={{
                                                uri: 'https://reactnative.dev/img/tiny_logo.png',
                                            }}
                                            style={{
                                                width: 50,
                                                height: 50,
                                                resizeMode: 'contain' 
                                            }}
                                        />
                                    </View>
                                    <View style={{flex: 1,flexDirection: 'row', paddingHorizontal: 5}}>
                                        <Subheading style={{flexWrap: 'wrap', }}>Effie's butter bread toast</Subheading>
                                    </View>
                                    <View style={{}}>
                                        <Text>Price: $5.49 X 1</Text>
                                        <Text>Total: $5.49</Text>
                                        <Text>Fees: $1.21</Text>
                                    </View>
                                </View>
                                <View style={{...styles.rowConEnd, borderBottomColor: '#eee', borderBottomWidth: 2, marginVertical: 5, paddingBottom: 5}}>
                                    <View style={{justifyContent: 'center',alignItems: 'center'}}>
                                        <Image 
                                            source={{
                                                uri: 'https://reactnative.dev/img/tiny_logo.png',
                                            }}
                                            style={{
                                                width: 50,
                                                height: 50,
                                                resizeMode: 'contain' 
                                            }}
                                        />
                                    </View>
                                    <View style={{flex: 1,flexDirection: 'row', paddingHorizontal: 5}}>
                                        <Subheading style={{flexWrap: 'wrap', }}>Effie's butter bread toast</Subheading>
                                    </View>
                                    <View style={{}}>
                                        <Text>Price: $5.49 X 1</Text>
                                        <Text>Total: $5.49</Text>
                                        <Text>Fees: $1.21</Text>
                                    </View>
                                </View>
                            </View>
                        </Card>
                        <Card style={styles.cardContainer}>
                            <Title>Order Total</Title>
                            <View style={{marginVertical: 5,paddingVertical: 5, borderTopWidth: 2, borderTopColor: '#eee'}}>
                                <View style={styles.rowConEnd}>
                                    <Subheading>Subtotal:</Subheading>
                                    <Subheading>$55</Subheading>
                                </View>
                                <View style={styles.rowConEnd}>
                                    <Subheading>Shipping:</Subheading>
                                    <Subheading>$0.00</Subheading>
                                </View>
                                <View style={styles.rowConEnd}>
                                    <Subheading>Tax:</Subheading>
                                    <Subheading>$3.33</Subheading>
                                </View>
                                <View style={styles.rowConEnd}>
                                    <Subheading>Total Earning:</Subheading>
                                    <Subheading>$42.02</Subheading>
                                </View>
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