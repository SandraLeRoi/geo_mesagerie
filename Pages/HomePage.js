import React from 'react';
import View from "react-native-web/src/exports/View";
import {Link} from "react-router-native";

function HomePage() {
    return (<View><Link to={"/register"}>Register</Link></View>)
}

export default HomePage;