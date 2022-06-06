import './styles/navbar.css';
import { NavLink } from "react-router-dom"

function Navbar({ nom, prenom, email, allchannels }) {
    const channels = allchannels.map((name, i) => {
        return (
            <div key={i} className="nav">
                <a href="#">{name}</a>
            </div>
        )
    });

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
            <a href="#">
                <div className="sidebar-footer">
                    <div className='user_infos_container'>
                        <h4>{prenom + ' ' + nom}</h4>
                        <h5>{email}</h5>
                    </div>
                </div>
            </a>
        </aside >
    );
}

export default Navbar;

