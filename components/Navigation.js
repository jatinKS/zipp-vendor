import React,{ useState, useEffect, useRef } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Orders from '../screens/Orders';
import Products from '../screens/Products';

import OrderDetails from '../screens/OrderDetails';
import ProductDetails from '../screens/ProductDetails';
import CreateProduct from '../screens/CreateProduct';
import NotificationScreen from '../screens/NotificationScreen';

import { DrawerContent } from './DrawerContent';

import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import { useDispatch, useSelector } from 'react-redux';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function MainDrawer() {
    return (
        <Drawer.Navigator  initialRouteName="Notifications" drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Orders" component={Orders} />
            <Drawer.Screen name="Products" component={Products} />
            <Drawer.Screen name="Notifications" component={NotificationScreen} />
        </Drawer.Navigator>
    );
}


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});


const Navigation = () => {

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const { isLoading, userInfo, error } = useSelector( state => state.user );

    useEffect( async () => {
        
        if(userInfo && expoPushToken){
            const userToken = userInfo.token;
            const response = await fetch('https://zippgrocery.com/api/save_notification_token.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    'expoPushToken': expoPushToken
                })
            });
            
            console.log('jatin notification test: ',await response.json());
        }
    }, [expoPushToken]);
    
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });
    
        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

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

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }
  
async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
}

export default Navigation;