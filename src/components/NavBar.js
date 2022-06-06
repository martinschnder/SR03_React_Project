import './styles/navbar.css';
import { NavLink } from "react-router-dom"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import APIService from "../utils/APIService";
import settings from './visuals/settings.png';
import deconnexion from './visuals/deconnexion.png';

function Navbar() {
    const [allchannels, setAllchannels] = useState([]);
    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [email, setEmail] = useState();

    const channels = allchannels.map((channel, i) => {
        return (
            <div key={i} className="nav">
                <Link to="/seechannel" state={{ channel: channel.id, title: channel.title }}>
                    {channel.title}
                </Link>
            </div>
        )
    });
    useEffect(() => {
        APIService.getAllChannels(1).then((data) => {
            setAllchannels(data)
        });
        APIService.getUser(1).then((data) => {
            setEmail(data.mail);
            setPrenom(data.firstName);
            setNom(data.lastName);
        });
    }, [APIService.getAllChannels(1)]);

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
                <NavLink to="/"><img width="20" height="20" src={deconnexion} /></NavLink>

            </div>
        </aside >
    );
}

export default Navbar;

