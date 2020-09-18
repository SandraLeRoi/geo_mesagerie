import React from 'react';
import axios from "axios";
import {useState} from 'react';
import {useHistory} from "react-router-dom"
import {View} from 'react-native';
import TextInput from "react-native-web/src/exports/TextInput";
import {Button} from "react-native-web";
import Text from "react-native-web/src/exports/Text";

function RegisterPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    let history = useHistory()


    function register() {
        axios.post("https://api.dunarr.com/api/register",{
            "username": username,
            "password": password
        },{}).then (
            response => {
                console.log(response.data)
                history.push("/Connexion")
            })
    }

    return (<View>
        <Text>Enregistrez-vous !</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={setUsername} placeholder="login"/>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={setPassword} placeholder="password"/>
        <Button onPress={register} title="Valider"></Button>
    </View>)
}

export default RegisterPage;