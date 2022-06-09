import "./styles/chatlist.css";
import edit from './visuals/edit.png';
import edit_white from './visuals/edit_white.png';
import deleteimage from './visuals/delete.png';
import deleteimage_white from './visuals/delete_white.png';
import see from './visuals/see.png';
import see_white from './visuals/see_white.png';
import { useContext, useEffect, useState } from "react";
import APIService from "../utils/APIService";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { queryAllByAltText } from "@testing-library/react";

function Chatlist({ mychannel }) {
    const [allchannels, setAllchannels] = useState([]);
    const [owners] = useState([]);
    const [id] = useContext(AuthContext);
    const [query, setQuery] = useState('');

    let deleteChannel = async (id) => {
        const object = { id: id };
        try {
            let res = await fetch('http://localhost:8080/deletechannel', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            });
            // let resJson = await res.json();
            if (res.status === 200) {
                console.log("Channel deleted successfully");
            } else {
                console.log("Some error occured");
            }
        } catch (err) {
            console.log("error" + err);
        }
    };

    const channels =
        mychannel ?
            allchannels.filter(channel => {
                if (query === '') {
                    return channel;
                } else if (channel.title.toLowerCase().includes(query.toLowerCase())) {
                    return channel;
                }
            }).map((channel, i) => {
                return (
                    <div key={i} className="table-row">
                        <div className="table-data">{channel.title}</div>
                        <div className="table-data modifier">
                            <Link to="/modifychannel" state={{ channel: channel.id, title: channel.title, desc: channel.description }}>
                                <img alt="" width="20" height="20" src={i % 2 === 0 ? edit_white : edit} />
                            </Link>
                        </div>
                        <div className="table-data supprimer">
                            <img alt="" onClick={() => deleteChannel(channel.id)} width="20" height="20" src={i % 2 === 0 ? deleteimage_white : deleteimage} />
                        </div>
                        <div className="table-data voir">
                            <Link to="/seechannel" state={{ channel: channel.id, title: channel.title, smalltitle: channel.description }}>
                                <img alt="" width="20" height="20" src={i % 2 === 0 ? see_white : see} />
                            </Link>
                        </div>
                    </div>
                )
            }) :
            allchannels.filter(channel => {
                if (query === '') {
                    return channel;
                } else if (channel.title.toLowerCase().includes(query.toLowerCase())) {
                    return channel;
                }
            }).map((channel, i) => {
                return (
                    <div key={i} className="table-row">
                        <div className="table-data">{channel.title}</div>
                        <div className="table-data">{owners[i]}</div>
                        <div className="table-data voir">
                            <Link to="/seechannel" state={{ channel: channel.id, title: channel.title, smalltitle: channel.description }}>
                                <img alt="" width="20" height="20" src={i % 2 === 0 ? see_white : see} />
                            </Link>
                        </div>
                    </div>
                )
            });

    const findOwnerName = () => {
        allchannels.map((channel) => (
            APIService.getUser(channel.owner).then((data) => {
                owners.push(data.firstName + ' ' + data.lastName);
            })
        ))
    }

    useEffect(() => {
        let fct = mychannel ?
            APIService.getMyChannels(id) : APIService.getAllChannels(id);
        fct
            .then((data) => {
                setAllchannels(data)
            });
        if (mychannel === false) {
            findOwnerName();
        }
    }, []);

    return (
        <div className="table">
            <input type="text" name="text" id="text" className="search" placeholder="Rechercher un chat..." onChange={event => setQuery(event.target.value)} />
            <div className="table-header">
                <div className="header__item">
                    <h4>chat</h4>
                </div>
                {mychannel ? null :
                    <div className="header__item">
                        <h4>propriétaire</h4>
                    </div>}
                {mychannel ? <div className="header__item">
                    <h4>modifier</h4>
                </div> : null}
                {mychannel ? <div className="header__item">
                    <h4>supprimer</h4>
                </div> : null}
                <div className="header__item">
                    <h4>voir</h4>
                </div>
            </div>
            <div className="table-content">
                {channels}
            </div>
        </div>
    );
}

export default Chatlist;