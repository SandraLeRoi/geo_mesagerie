import React from "react";
import Text from "react-native-web/dist/exports/Text";
import  axios from "axios";
import {useState, useEffect} from "react";
import {View} from "react-native";
import TextInput from "react-native-web/dist/exports/TextInput";
import {Button, FlatList} from "react-native-web";

function MessagesPage(props) {
    //envoyer un message
    const [message, setMessage] = useState(null);
    //les catégories
    const [category, setCategory] = useState(null);

    //tous les messages de la catégories
    const [messagesChat, setMessagesChat] = useState([])

    // id tous les auteurs
    const [user, setUser] = useState([]);

    useEffect(getCategory,[])
    useEffect(getAllUsers,[])

    useEffect( function() {

    },[])

    // récupérer tous les messages
    function getMessages(user) {
        axios.get("https://api.dunarr.com/api/messages",{
            headers : {"Authorization": "Bearer " + props.token},
            params: {"citycode": props.citycode,
                "category": category,}
        }).then(response => {
            // console.log(response.data.results);
            // console.log(user);
            // console.log(messagesChat);
            //for (var i = 0; i<= user.length; i++) {
                response.data.results[0].author = user.find(function (singleUser){
                    // console.log( singleUser.id , response.data.results[0].author.id, singleUser.id === response.data.results[0].author.id)
                    return singleUser.id === response.data.results[0].author.id
                })
            //}
            setMessagesChat(response.data.results);
        })
    }

    //envoyer un message
    function postMessages() {
        axios.post("https://api.dunarr.com/api/messages", {
            "message": message,
            "category" : category,
            "citycode": props.citycode
        },{
            headers: {"Authorization": "Bearer " + props.token }
        }).then(response => {
            console.log(response.data);
        })
    }

    //récupérer la catégorie
    function getCategory() {
        axios.get("htpps://api.dunarr.com/api/categories",{
            headers: {"Authorization": "Bearer " + props.token }
        })
            .then(response => {
                console.log(response.data)
                setCategory(response.data[0].id)
            })
    }


    //récupère tous les auteurs
    function getAllUsers() {
        axios.get("https://api.dunarr.com/api/users",{
            headers: {"Authorization": "Bearer " + props.token}
        })
            .then(response => {
                console.log(response.data)
                setUser(response.data)
                setInterval(()=>{getMessages(response.data)}, 2000)
            })
    }


    return (<View>
        <Text>Hello</Text>
        <TextInput onChangeText={setMessage} placeholder="Message"/>
        <Button onPress={postMessages} title="Envoyer"/>
        <FlatList data={messagesChat} renderItem={({mess}) => <Text> {mess.author.username} a dit : "{mess.content}" </Text>} />
    </View>)
}

export default MessagesPage;