import React from "react";
import Text from "react-native-web/dist/exports/Text";
import * as Location from "expo-location";
import * as axios from "axios";
import {useState, useEffect} from "react";
import {View} from "react-native";
import {useParams} from "react-router-dom"

function MessagesPage() {

    const [location, setLocation] = useState(null)
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [adresse, setAdresse] = useState(null);
    const [message, setMessage] = useState(null);
    const token= "";
    const [category, setCategory] = useState(null);
    const {params} = useParams()

    useEffect( ()=>{
        (async() => {
            const { status } = await Location.requestPermissionsAsync();
            //setLocation("status")
            if (status !== 'granted') {
                console.error('permission not granted');
            }
            const position = await Location.getCurrentPositionAsync();
            setLocation(position)
            setLongitude(position.coords.longitude);
            setLatitude(position.coords.latitude);

        })()
    },[])

    useEffect(findAddress, [longitude,latitude])
    useEffect(getCategory,[])

    function findAddress() {
        axios.get("https://api-adresse.data.gouv.fr/reverse/?lon=" + longitude + "&lat=" + latitude)
            .then(response => {
                setAdresse(response.data.features[0].properties.citycode);
            })
    }

    function getMessages() {
        axios.get("https://api.dunarr.com/api/messages", {
            "category": "bidule",
            "citycode": adresse
        },{
            headers : {"Authorization": "Bearer "+token}
        }).then(response => {
            console.log(response.data);
        })
    }

    function postMessages() {
        axios.post("https://api.dunarr.com/api/messages", {
            "message": message,
            "category" : category,
            "citycode": adresse
        },{
            headers: {"Authorization": "Bearer " + token }
        }).then(response => {
            console.log(response.data);
        })
    }

    function getCategory() {
        axios.get("htpps://api.dunarr.com/api/categories", {}, {
            headers: {"Authorization": "Bearer "+ token }
        })
    }

    return (<View><Text>Hello</Text><Text>{JSON.stringify(params)}</Text></View>)
}

export default MessagesPage;