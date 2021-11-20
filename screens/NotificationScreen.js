import React,{ useEffect } from "react";
import { View, Text, FlatList } from 'react-native';
import { ScreenContainer,NotificationEl } from '../components/elements';
import { useSelector, useDispatch } from "react-redux";
import { getNotifications } from '../app/features/notification/notificationsSlice';
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator } from 'react-native-paper';

const NotificationScreen = () => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const { isNotificationsLoading, notifications, error } = useSelector( state => state.notifications);
    
    useEffect(()=>{
        dispatch(getNotifications());
    },[isFocused]);

    console.log('isNotificationsLoading', isNotificationsLoading);
    console.log('error', error);

    const renderItem = ({ item }) => { 
        return (
            <NotificationEl notification={item} key={item.ID} />
        );
    };

    return (
        <ScreenContainer>
            {isNotificationsLoading &&  <ActivityIndicator animating={true} /> }
            {notifications && (
                <FlatList
                    data={notifications}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            )}
        </ScreenContainer>
    )
}

export default NotificationScreen;