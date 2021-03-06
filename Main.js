import React,{ useEffect } from 'react';
import { 
    StyleSheet, View, 
    TouchableWithoutFeedback, Keyboard, 
} from 'react-native';
import Login from './screens/Login';
import Navigation from './components/Navigation';
import { useSelector, useDispatch } from 'react-redux';

import { loginFromStorage, logout } from './app/features/users/UserSlice';
import { getUserSettings } from './app/features/users/UserSettingsSlice';

const Main = () => {
    const dispatch = useDispatch();
    const { isLoading, userInfo, error } = useSelector( state => state.user );

    useEffect(()=>{
        if(userInfo){
            dispatch(getUserSettings());
        }else{
            dispatch(loginFromStorage());
        }
        /* dispatch(logout()) */
    },[userInfo]);

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={styles.container}>
                {!userInfo && <Login />}
                {userInfo && <Navigation />}
            </View>
        </TouchableWithoutFeedback>
    );
}
 
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});



export default Main;