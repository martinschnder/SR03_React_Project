import { useEffect } from 'react';
import { over } from 'stompjs'
import SockJS from 'sockjs-client'
import './styles/chat.css';

function Chat() {
    var stompClient = null;
    const setConnected = (connected) => {
        document.getElementById('connect').disabled = connected;
        document.getElementById('disconnect').disabled = !connected;
        document.getElementById('conversationDiv').style.visibility
            = connected ? 'visible' : 'hidden';
        document.getElementById('response').innerHTML = '';
    }

    const connect = () => {
        var socket = new SockJS('/chat');
        stompClient = over(socket);
        stompClient.connect({}, function (frame) {
            setConnected(true);
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/messages', function (messageOutput) {
                showMessageOutput(JSON.parse(messageOutput.body));
            });
        });
    }

    const disconnect = () => {
        if (stompClient != null) {
            stompClient.disconnect();
        }
        setConnected(false);
        console.log("Disconnected");
    }

    const sendMessage = () => {
        var from = document.getElementById('from').value;
        var text = document.getElementById('text').value;
        stompClient.send("/app/chat", {},
            JSON.stringify({ 'from': from, 'text': text }));
    }

    const showMessageOutput = (messageOutput) => {
        var response = document.getElementById('response');
        var p = document.createElement('p');
        p.style.wordWrap = 'break-word';
        p.appendChild(document.createTextNode(messageOutput.from + ": "
            + messageOutput.text + " (" + messageOutput.time + ")"));
        response.appendChild(p);
    }
    // const writeButton = document.getElementById('write-button');
    // writeButton.addEventListener('click', function (event) {
    //     const textInput = document.getElementById("text");
    //     const buttonDiv = document.getElementsByClassName("button-container")[0];
    //     writeButton.style.display = "none";
    //     textInput.style.display = "block";
    //     buttonDiv.style.display = "block";
    // })

    // const closeButton = document.getElementById('close-button');
    // closeButton.addEventListener('click', function (event) {
    //     const writeButton = document.getElementById('write-button');
    //     const textInput = document.getElementById("text");
    //     const buttonDiv = document.getElementsByClassName("button-container")[0];
    //     textInput.style.display = "none";
    //     buttonDiv.style.display = "none";
    //     writeButton.style.display = "block";
    // })

    // const message = (name, content, time) => {
    //     return (
    //         <div class="container">
    //             <h4>{name}</h4>
    //             <p>{content}</p>
    //             <span class="time">{time}</span>
    //         </div>
    //     )
    // };

    // // martin

    // useEffect(() => {
    //     connect();
    //     return disconnect();
    // });

    // var stompClient = null;

    // function setConnected(connected) {
    //     document.getElementById('connect').disabled = connected;
    //     document.getElementById('disconnect').disabled = !connected;
    //     document.getElementById('conversationDiv').style.visibility
    //         = connected ? 'visible' : 'hidden';
    //     document.getElementById('response').innerHTML = '';
    // }

    // function connect() {
    //     var socket = new SockJS('/chat');
    //     stompClient = over(socket);
    //     stompClient.connect({}, function (frame) {
    //         setConnected(true);
    //         console.log('Connected: ' + frame);
    //         stompClient.subscribe('/topic/messages', function (messageOutput) {
    //             showMessageOutput(JSON.parse(messageOutput.body));
    //         });
    //     });
    // }

    // function disconnect() {
    //     if (stompClient != null) {
    //         stompClient.disconnect();
    //     }
    //     setConnected(false);
    //     console.log("Disconnected");
    // }

    // function sendMessage() {
    //     // var from = document.getElementById('from').value;
    //     var from = "martin";
    //     var text = document.getElementById('text').value;
    //     stompClient.send("/app/chat", {},
    //         JSON.stringify({ 'from': from, 'text': text }));
    // }

    // function showMessageOutput(messageOutput) {
    //     // var response = document.getElementById('response');
    //     // var p = document.createElement('p');
    //     // p.style.wordWrap = 'break-word';
    //     // p.appendChild(document.createTextNode(messageOutput.from + ": "
    //     //     + messageOutput.text + " (" + messageOutput.time + ")"));
    //     // response.appendChild(p);
    //     var messageContainer = document.getElementById("messages-container");
    //     messageContainer.appendChild(message(messageOutput.from, messageOutput.text, messageOutput.time))
    // }

    // //

    return (
        <div>
            <div>
                <input type="text" id="from" placeholder="Choose a nickname" />
            </div>
            <br />
            <div>
                <button id="connect" onClick={connect}>Connect</button>
                <button id="disconnect" disabled="disabled" onClick={disconnect}>
                    Disconnect
                </button>
            </div>
            <br />
            <div id="conversationDiv">
                <input type="text" id="text" placeholder="Write a message..." />
                <button id="sendMessage" onClick={sendMessage}>Send</button>
                <p id="response"></p>
            </div>
        </div>

        // <div id="messages-container" class="messages-container">
        //     {message("paul", "salut bob", "11:00")}
        //     {message("martin", "salut paul", "11:05")}
        //     <div>
        //         <input type="text" name="text" id="text" class="write-input" placeholder="Votre message..." />
        //     </div>
        //     {/* <form method="get" id="userForm" class="form_undisplay" novalidate>
        //         <input type="text" name="text" id="text" class="write-input" placeholder="Votre message..." />
        //     </form> */}
        //     {/* <button class="write-button" id="write-button">Ecrire</button>
        //     <div class="button-container">
        //         <button class="send-button" id="send-button">Envoyer</button>
        //         <button class="close-button" id="close-button">Fermer</button>
        //     </div> */}
        // </div>
    );
}

export default Chat;

