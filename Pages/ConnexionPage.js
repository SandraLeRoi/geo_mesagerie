import React from 'react';
import axios from "axios";
import {useState} from 'react';

import {View} from 'react-native';
import TextInput from "react-native-web/src/exports/TextInput";
import {Button} from "react-native-web";
import { useHistory } from "react-router-dom";
import Text from "react-native-web/dist/exports/Text";


function ConnexionPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [identifiant, setIdentifiant] = useState("")
    let history = useHistory();


    function connexion() {
        axios.post("https://api.dunarr.com/api/login",{
            "username": username,
            "password": password
        },{}).then (
            response => {
                console.log(response.data);
                setIdentifiant(response.data.token);
                history.push("/messages/" + identifiant);
            })

    }

    return (<View>
        <Text>Connectez-vous !</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={setUsername} placeholder="login"/>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={setPassword} placeholder="password"/>
        <Button onPress={connexion} title="Valider"></Button>

    </View>)
}

export default ConnexionPage;