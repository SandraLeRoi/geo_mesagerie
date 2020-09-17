import React from 'react';
import View from "react-native-web/src/exports/View";
import {Link} from "react-router-native";
import {Button, Text} from "react-native-web";

function HomePage(props) {
    return (<View>
        <Button onPress={()=>props.history.push("/register")} title="Register"></Button>
        <Button onPress={()=>props.history.push("/connexion")} title="Connexion"></Button>
    </View>)
}

export default HomePage;