import './App.css';
import Login from './components/Login';
import Navbar from './components/NavBar';
import Header from './components/Header';
import Chat from './components/Chat';
import Chatlist from './components/ChatList';
import { Children, useEffect } from 'react';

function App() {
    useEffect(() => {
        document.body.style.backgroundColor = "#efefef";
        document.body.style.height = "100vh";
        document.body.style.flex = 1;
        document.body.style.padding = 0;
        document.body.style.margin = 0;
    }, []);

    return (
        <div className="flex-container">
            <Navbar nom="Schneider" prenom="Martin" email="martin@gmail.com" allchannels={["channel 1", "channel 2 "]} />
            <main className="main">
                <Header title="Tous les chats" />
                {/* <Chatlist mychannel={true} allchannels={["channel 1", "channel 2 "]} owner={["bobby", "moi"]} /> */}
                <Chat />
            </main>
        </div>
    );
}

export default App;
