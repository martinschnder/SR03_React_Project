import { useEffect, useRef, useState, useContext } from 'react';
import { over } from 'stompjs'
import SockJS from 'sockjs-client'
import './styles/chat.css';
import Header from './Header';
import { useLocation } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import APIService from '../utils/APIService';


function Chat() {

    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const [id] = useContext(AuthContext);
    const stompClient = useRef(null);
    const [prenom, setPrenom] = useState('');
    var colors = new Map();



    useEffect(() => {

        if (stompClient.current != null) {
            console.log("StompClient is not null");
            return undefined;
        }

        function connect() {
            var socket = new SockJS('http://localhost:8080/chat');
            stompClient.current = over(socket);

            stompClient.current.connect({}, function (frame) {
                console.log('Connected: ' + frame);

                stompClient.current.subscribe(`/topic/messages/${location.state.channel}`, function (messageOutput) {
                    let newMessage = JSON.parse(messageOutput.body);
                    console.log(newMessage);
                    setMessages((oldMessages) => [...oldMessages, newMessage]);
                });
            });
        }

        connect();

        // return (() => {
        //     if (stompClient.current != null) {
        //         console.log("trying to disconnect")
        //         stompClient.current.disconnect();
        //     }
        //     console.log("Disconnected");
        // })

    }, []);

    const generateColor = (name) => {
        console.log(colors.get(name));
        if (colors.get(name) === undefined) {
            let newcolor = Math.floor(Math.random() * 0xFFFFFF).toString(16);
            colors.set(name, newcolor);
            return newcolor;
        } else {

            return colors.get(name);
        }
    }

    function sendMessage() {
        var from = prenom;
        var text = document.getElementById('text').value;

        stompClient.current.send(`/app/chat/${location.state.channel}`, {},
            JSON.stringify({ 'from': from, 'text': text }));

        document.getElementById('text').value = '';
    }



    useEffect(() => {
        APIService.getUser(id).then((data) => {
            setPrenom(data.firstName);
        });

        const writeButton = document.getElementById('write-button');
        writeButton.addEventListener('click', function (event) {
            const textInput = document.getElementById("text");
            const buttonDiv = document.getElementsByClassName("button-container")[0];
            writeButton.style.display = "none";
            textInput.style.display = "block";
            buttonDiv.style.display = "block";
        })

        const closeButton = document.getElementById('close-button');
        closeButton.addEventListener('click', function (event) {
            const writeButton = document.getElementById('write-button');
            const textInput = document.getElementById("text");
            const buttonDiv = document.getElementsByClassName("button-container")[0];
            textInput.style.display = "none";
            buttonDiv.style.display = "none";
            writeButton.style.display = "block";
        })
    }, []);

    return (
        <main className="main">
            <Header title={"Salon du chat : " + location.state.title} smalltitle={"Description : " + location.state.smalltitle} />
            <div id="messages-container" className="messages-container">
                <ul className="chat" id="chatList">
                    {messages.map((data, i) => (
                        <div key={i}>
                            {prenom === data.from ? (
                                <li className="self">
                                    <div className="msg">
                                        <p>{data.from}</p>
                                        <div className="message">{data.text}</div>
                                        <div className="time">{data.time}</div>
                                    </div>
                                </li>
                            ) : (
                                <li className="other">
                                    <div className="msg">
                                        <p style={{ color: "#" + generateColor(data.from) }}>{data.from}</p>
                                        <div className="message"> {data.text} </div>
                                        <div style={{ color: "#" + generateColor(data.from) }} className="time">{data.time}</div>
                                    </div>
                                </li>
                            )}
                        </div>
                    ))}
                </ul>
            </div >
            <div>
                <input type="text" name="text" id="text" className="write-input" placeholder="Votre message..." />
            </div>
            <button className="write-button" id="write-button">Ecrire</button>
            <div className="button-container">
                <button className="send-button" id="send-button" onClick={sendMessage}>Envoyer</button>
                <button className="close-button" id="close-button">Fermer</button>
            </div>
        </main >
    );
}

export default Chat;

