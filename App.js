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
import ConnexionPage from "./Pages/ConnexionPage";
import MessagesPage from "./Pages/MessagesPage";

export default function App() {


  return (
    <View style={styles.container}>
      <NativeRouter>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/register" component={RegisterPage}/>
          <Route path="/connexion" component={ConnexionPage}/>
          <Route path="/messages" component={MessagesPage}/>
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
