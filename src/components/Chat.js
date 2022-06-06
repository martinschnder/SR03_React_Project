import { useEffect, useState } from 'react';
import { over } from 'stompjs'
import SockJS from 'sockjs-client'
import './styles/chat.css';
import Header from './Header';
import { useLocation } from "react-router-dom";
import { wait } from '@testing-library/user-event/dist/utils';


function Chat() {

    const location = useLocation();
    const [messages, setMessages] = useState([]);

    // const message = (name, content, time) => {
    //     return (
    //         <div className="container">
    //             <h4>{name}</h4>
    //             <p>{content}</p>
    //             <span className="time">{time}</span>
    //         </div>
    //     )
    // };

    useEffect(() => {
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
        connect();

    });

    var stompClient = null;

    function connect() {
        var socket = new SockJS('http://localhost:8080/chat');
        stompClient = over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe(`/topic/messages/${location.state.channel}`, function (messageOutput) {
                showMessageOutput(JSON.parse(messageOutput.body));
            });
        });
        // return disconnect();
    }

    function disconnect() {
        if (stompClient != null) {
            stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    function sendMessage() {
        var from = "martin";
        var text = document.getElementById('text').value;
        stompClient.send(`/app/chat/${location.state.channel}`, {},
            JSON.stringify({ 'from': from, 'text': text }));
    }

    function showMessageOutput(messageOutput) {
        console.log(messageOutput);
        setMessages([...messages, messageOutput]);
    }

    return (
        <main className="main">
            <Header title={"Salon du chat : " + location.state.title} />
            <div id="messages-container" className="messages-container">
                <ul className="chat" id="chatList">
                    {messages.map(data => (
                        <div>
                            {"martin" === data.from ? (
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
                                        <p>{data.from}</p>
                                        <div className="message"> {data.text} </div>
                                    </div>
                                </li>
                            )}
                        </div>
                    ))}
                </ul>
            </div>
            <div>
                <input type="text" name="text" id="text" className="write-input" placeholder="Votre message..." />
            </div>
            <button className="write-button" id="write-button">Ecrire</button>
            <div className="button-container">
                <button className="send-button" id="send-button" onClick={sendMessage}>Envoyer</button>
                <button className="close-button" id="close-button">Fermer</button>
            </div>
        </main>
    );
}

export default Chat;

