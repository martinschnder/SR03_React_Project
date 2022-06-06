import './App.css';
import Login from './components/Login';
import Navbar from './components/NavBar';
import Header from './components/Header';
import Chat from './components/Chat';
import Chatlist from './components/ChatList';
import AddChat from './components/AddChat';
import MyChat from './components/MyChat';
import Home from './components/Home';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ModifyChat from './components/ModifyChat';

function App() {
    useEffect(() => {
        document.body.style.backgroundColor = "#efefef";
        document.body.style.height = "100vh";
        document.body.style.flex = 1;
        document.body.style.padding = 0;
        document.body.style.margin = 0;
    }, []);


    return (
        <BrowserRouter>
            <div className="flex-container">
                <Navbar nom="Schneider" prenom="Martin" email="martin@gmail.com" allchannels={["channel 1", "channel 2 "]} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/addchannel" element={<AddChat />} />
                    <Route path="/mychannels" element={<MyChat />} />
                    <Route path="/modifychannel" element={<ModifyChat />} />
                    <Route path="/seechannel" element={<Chat />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
