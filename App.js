import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import * as axios from 'axios';
import TextInput from "react-native-web/src/exports/TextInput";
import {NativeRouter, Link, Switch, Route} from "react-router-native";
import RegisterPage from "./Pages/RegisterPage";
import HomePage from "./Pages/HomePage";


export default function App() {

  const [location, setLocation] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [latitude, setLatitude] = useState(null)
  const [adresse, setAdresse] = useState(null)

  useEffect( ()=>{
    (async() => {
      const { status } = await Location.requestPermissionsAsync()
      //setLocation("status")
      if (status !== 'granted') {
        console.error('permission not granted')
      }
      const position = await Location.getCurrentPositionAsync()
      setLocation(position)
      setLongitude(position.coords.longitude)
      setLatitude(position.coords.latitude)

    })()
  },[])

  useEffect(findAddress, [longitude,latitude])

  function findAddress() {
    axios.get("https://api-adresse.data.gouv.fr/reverse/?lon=" + longitude + "&lat=" + latitude)
        .then(response => {setAdresse(response.data.features[0].properties.citycode)}
        )
  }
  return (
    <View style={styles.container}>
      <NativeRouter>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/register" component={RegisterPage}/>
        </Switch>
      </NativeRouter>
      <TextInput value="test"/>

      <Text> {JSON.stringify(adresse)} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
