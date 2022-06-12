import { useEffect, useRef, useState, useContext } from 'react';
import { over } from 'stompjs'
import SockJS from 'sockjs-client'
import './styles/chat.css';
import Header from './Header';
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import APIService from '../utils/APIService';


function Chat() {

    const location = useLocation();
    const [messages, setMessages] = useState([]); // tableau vide qui servira à stocker les messages entrants
    const [id] = useContext(AuthContext);
    const stompClient = useRef(null);
    const [prenom, setPrenom] = useState('');
    var colors = new Map();

    const navigate = useNavigate();

    useEffect(() => {

        if (stompClient.current != null) {  // permet de ne pas créer de socket en double
            return undefined;
        }

        function connect() {
            var socket = new SockJS('http://localhost:8080/chat');
            stompClient.current = over(socket);

            stompClient.current.connect({}, function (frame) { // connexion WebSocket
                console.log('Connected: ' + frame);
                stompClient.current.subscribe(`/topic/messages/${location.state.channel}`, function (messageOutput) {  // on intègre l'id du chat dans la méthode subscribe pour recevoir uniquement les messages voulus
                    let newMessage = JSON.parse(messageOutput.body); // on défini le traitement des messages entrants
                    setMessages((oldMessages) => [...oldMessages, newMessage]);
                });
            });
        }

        connect();
    });

    const generateColor = (name) => { // génération de couleurs aléatoire pour chaque user connecté
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

        if (text !== '') {
            stompClient.current.send(`/app/chat/${location.state.channel}`, {}, // on s'assure d'envoyer les messages à la destination à laquelle le composant est abonné
                JSON.stringify({ 'from': from, 'text': text }));
            document.getElementById('text').value = ''; // on reset l'input des messages
        }
    }

    function handleDisconnect() {
        stompClient.current.disconnect(); // deconnexion de la socket après appui sur le bouton
        navigate('/mychannels');
    }

    useEffect(() => {
        APIService.getUser(id).then((data) => { // on récupère de prénom de l'utilisateur grâce à son id
            setPrenom(data.firstName);
        });

        const writeButton = document.getElementById('write-button'); // gestion des boutons écrire et fermer (TD03)
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
                    {messages.map((data, i) => ( // on boucle sur les messages contenus dans le tableau des messages recus
                        <div key={i}>
                            {prenom === data.from ? ( // si le message provient de l'utilisateur connecté
                                <li className="self">
                                    <div className="msg">
                                        <p>{data.from}</p>
                                        <div className="message">{data.text}</div>
                                        <div className="time">{data.time}</div>
                                    </div>
                                </li>
                            ) : ( // si le message provient d'un autre utilisateur 
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
            <button className="disco-button" id="disco-button" onClick={handleDisconnect}>Deconnexion</button>
        </main >
    );
}

export default Chat;

