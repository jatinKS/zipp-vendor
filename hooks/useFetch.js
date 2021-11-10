import React, { useState, useEffect } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';

// import { userLogout } from '../redux/userLoginSlice';

const useFetch = (url) => {
    const isFocused = useIsFocused();
    const [data,setData] = useState(null);
    
    const dispatch = useDispatch();

    //const user = useSelector((state) => state.userLogin.userInfo);

    useEffect(() => { 
        if(isFocused){
            const token = user.token;
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
        }     
    },[isFocused,url]);
}

export default useFetch;