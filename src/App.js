import './App.css';
import Chat from './components/Chat';
import AddChat from './components/AddChat';
import MyChat from './components/MyChat';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom"
import ModifyChat from './components/ModifyChat';
import ModifyUser from './components/ModifyUser';
import { AuthContext } from './utils/AuthContext';
import Login from './components/Login';
import Navbar from './components/NavBar'

function App() {
    const [sign, setSign] = useState(false); // booléen "est ce que l'utilisateur est connecté ?"
    const [id, setId] = useState(0); // id de l'utilisateur connecté

    useEffect(() => {
        document.body.style.backgroundColor = "#efefef";
        document.body.style.height = "100vh";
        document.body.style.flex = 1;
        document.body.style.padding = 0;
        document.body.style.margin = 0;
    }, []);


    return (
        <AuthContext.Provider value={[sign, setSign, id, setId]}> {/*contexte partagé par tous les composants enfants*/}
            <BrowserRouter>
                <div className="flex-container">
                    {sign ? <Navbar /> : null}
                    <Routes>
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/" element={sign ? <Home /> : <Navigate to="/login" />} /> {/*si l'utilisateur est connecté on renvoie le composant Home, sinon on le renvoie vers le Login*/}
                        <Route exact path="/addchannel" element={sign ? <AddChat /> : <Navigate to="/login" />} />
                        <Route exact path="/mychannels" element={sign ? <MyChat /> : <Navigate to="/login" />} />
                        <Route exact path="/modifychannel" element={sign ? <ModifyChat /> : <Navigate to="/login" />} />
                        <Route exact path="/seechannel" element={sign ? <Chat /> : <Navigate to="/login" />} />
                        <Route exact path="/modifyuser" element={sign ? <ModifyUser /> : <Navigate to="/login" />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
