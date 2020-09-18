import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import * as axios from 'axios';
import {NativeRouter, Switch, Route} from "react-router-native";
import RegisterPage from "./Pages/RegisterPage";
import HomePage from "./Pages/HomePage";
import ConnexionPage from "./Pages/ConnexionPage";
import MessagesPage from "./Pages/MessagesPage";

export default function App() {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null)
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [citycode, setCitycode] = useState(null);

  useEffect( ()=>{
    (async() => {
      const { status } = await Location.requestPermissionsAsync();
      //setLocation("status")
      if (status !== 'granted') {
        console.error('permission not granted');
      }
      const position = await Location.getCurrentPositionAsync();
      //setLocation(position)
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);

    })()
  },[])

  useEffect(findAddress, [longitude,latitude])


  function findAddress() {
    axios.get("https://api-adresse.data.gouv.fr/reverse/?lon=" + longitude + "&lat=" + latitude)
        .then(response => {
          setCitycode(response.data.features[0].properties.citycode);
        })
  }
  return (
    <View style={styles.container}>
      <NativeRouter>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/register" component={RegisterPage}/>
          <Route path="/connexion" >
            <ConnexionPage setToken={setToken} setId={setId}/>
          </Route>
          <Route path="/messages/" >
            <MessagesPage token={token} citycode={citycode} id={id}/>
          </Route>
        </Switch>
      </NativeRouter>
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
