import './styles/navbar.css';
import { NavLink } from "react-router-dom"
import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import APIService from "../utils/APIService";
import settings from './visuals/settings.png';
import deconnexion from './visuals/deconnexion.png';

function Navbar() {
    const [allchannels, setAllchannels] = useState([]);
    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [email, setEmail] = useState();
    const [id, setId] = useContext(AuthContext);
    const [sign, setSign] = useContext(AuthContext);
    const navigate = useNavigate();

    const channels = allchannels.map((channel, i) => {
        return (
            <div key={i} className="nav">
                <Link to="/seechannel" state={{ channel: channel.id, title: channel.title }}>
                    {channel.title}
                </Link>
            </div>
        )
    });

    const disconnect = () => {
        setSign(false);
        setId(0);
        navigate('/login');
    };

    useEffect(() => {
        APIService.getAllChannels(id).then((data) => {
            setAllchannels(data)
        });
        APIService.getUser(id).then((data) => {
            setEmail(data.mail);
            setPrenom(data.firstName);
            setNom(data.lastName);
        });
    }, [APIService.getAllChannels(id)]);

    return (
        <aside className="aside">
            <div className="aside-header">
                <h3>MATTERLEAST</h3>
            </div>
            <div className="content">
                <div className="channel">
                    <div className="fix-nav">
                        <h4><NavLink to="/mychannels">MES CHATS</NavLink></h4>
                    </div>
                    <div className="fix-nav">
                        <h4><NavLink to="/addchannel">AJOUTER UN CHAT</NavLink></h4>
                    </div>
                    <div className="fix-nav">
                        <h4><NavLink to="/">TOUS LES CHATS</NavLink></h4>
                    </div>
                    {channels}
                </div>
            </div>
            <div className="sidebar-footer">
                <div className='user_infos_container'>
                    <h4>{prenom + ' ' + nom}</h4>
                    <h5>{email}</h5>
                </div>
                <NavLink to="/modifyuser"><img width="20" height="20" src={settings} /></NavLink>
                <a><img onClick={() => disconnect()} width="20" height="20" src={deconnexion} /></a>
            </div>
        </aside >
    );
}

export default Navbar;

