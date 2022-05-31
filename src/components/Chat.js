import { useEffect, useState } from 'react';
import { over } from 'stompjs'
import SockJS from 'sockjs-client'
import './styles/chat.css';
import Header from './Header';


function Chat({ channel }) {

    const [messages, setMessages] = useState([]);

    // const message = (name, content, time) => {
    //     return (
    //         <div class="container">
    //             <h4>{name}</h4>
    //             <p>{content}</p>
    //             <span class="time">{time}</span>
    //         </div>
    //     )
    // };

    useEffect(() => {
        connect();

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
    });

    var stompClient = null;

    function connect() {
        var socket = new SockJS('http://localhost:8080/chat');
        stompClient = over(socket);
        stompClient.connect({}, function (frame) {
            // setConnected(true);
            console.log('Connected: ' + frame);
            stompClient.subscribe(`/topic/messages/${channel}`, function (messageOutput) {
                showMessageOutput(JSON.parse(messageOutput.body));
            });
        });
    }

    function disconnect() {
        if (stompClient != null) {
            stompClient.disconnect();
        }
        // setConnected(false);
        console.log("Disconnected");
    }

    function sendMessage() {
        var from = "martin";
        var text = document.getElementById('text').value;
        stompClient.send(`/app/chat/${channel}`, {},
            JSON.stringify({ 'from': from, 'text': text }));
    }

    function showMessageOutput(messageOutput) {
        console.log(messageOutput);
        setMessages([...messages, messageOutput]);
    }

    return (
        <main className="main">
            <Header title={channel} />
            <div id="messages-container" class="messages-container">
                <ul className="chat" id="chatList">
                    {messages.map(data => (
                        <div>
                            {"martin" === data.from ? (
                                <li className="self">
                                    <div className="msg">
                                        <p>{data.from}</p>
                                        <div className="message">{data.text}</div>
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
                <input type="text" name="text" id="text" class="write-input" placeholder="Votre message..." />
            </div>
            <button class="write-button" id="write-button">Ecrire</button>
            <div class="button-container">
                <button class="send-button" id="send-button" onClick={sendMessage}>Envoyer</button>
                <button class="close-button" id="close-button">Fermer</button>
            </div>
        </main>
    );
}

export default Chat;

