import React from 'react';
import App from "../App";
import * as axios from "axios";
import {useState} from 'react';

import {  Text, View } from 'react-native';

function RegisterPage() {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    /*
    function register() {
        axios.post("https://api.dunarr.com/api/register",{
            "username": username,
            "password": password
        })
    }
    */
    return (<View><Text>Hello</Text></View>)
}

export default RegisterPage;