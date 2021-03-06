import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    TouchableRipple,
    Text,
    Switch,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Fontisto, Octicons } from '@expo/vector-icons';
import { logout } from '../app/features/users/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

export function DrawerContent(props) {
    const { isUserSettingsLoading, userSettings, error } = useSelector( state => state.userSettings );
    const dispatch = useDispatch();
    
    const paperTheme = useTheme();

    /* console.log('settings: ',userSettings); */

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                            />
                            <View style={{flex: 1, marginLeft:15, flexDirection:'column'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Title style={{...styles.title, flex: 1, flexWrap: 'wrap'}}>{userSettings.store_name}</Title>
                                </View>
                                <Caption style={styles.caption}>{userSettings.user_name}</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Fontisto name="shopping-bag-1" size={24} color="black" />
                            )}
                            label="Orders"
                            onPress={() => {props.navigation.navigate('Orders')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Octicons name="package" size={24} color="black" />
                            )}
                            label="Products"
                            onPress={() => {props.navigation.navigate('Products')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Octicons name="bell" size={24} color="black" />
                            )}
                            label="Notifications"
                            onPress={() => {props.navigation.navigate('Notifications')}}
                        />
                    </Drawer.Section>
                    {/* <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => { console.log('hello'); }}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section> */}
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => { 
                        Alert.alert(
                            "Logout",
                            "Are you sure you want logout now?",
                            [
                              {
                                text: "Cancel",
                                style: "cancel"
                              },
                              { text: "Logout", onPress: () => dispatch(logout())  }
                            ]
                        );
                    }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
  });