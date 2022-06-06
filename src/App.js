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
    const [sign, setSign] = useState(false);
    const [id, setId] = useState(0);

    useEffect(() => {
        document.body.style.backgroundColor = "#efefef";
        document.body.style.height = "100vh";
        document.body.style.flex = 1;
        document.body.style.padding = 0;
        document.body.style.margin = 0;
    }, []);


    return (
        <AuthContext.Provider value={[sign, setSign, id, setId]}>
            <BrowserRouter>
                <div className="flex-container">
                    {sign ? <Navbar nom="Schneider" prenom="Martin" email="martin@gmail.com" /> : null}
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={sign ? <Home /> : <Navigate to="/login" />} />
                        <Route path="/addchannel" element={sign ? <AddChat /> : <Navigate to="/login" />} />
                        <Route path="/mychannels" element={sign ? <MyChat /> : <Navigate to="/login" />} />
                        <Route path="/modifychannel" element={sign ? <ModifyChat /> : <Navigate to="/login" />} />
                        <Route path="/seechannel" element={sign ? <Chat /> : <Navigate to="/login" />} />
                        <Route path="/modifyuser" element={sign ? <ModifyUser /> : <Navigate to="/login" />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
