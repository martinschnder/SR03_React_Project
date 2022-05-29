import "./styles/chatlist.css";
import edit from './visuals/edit.png';
import edit_white from './visuals/edit_white.png';
import deleteimage from './visuals/delete.png';
import deleteimage_white from './visuals/delete_white.png';
import see from './visuals/see.png';
import see_white from './visuals/see_white.png';
import { useEffect, useState } from "react";
import APIService from "../utils/APIService";

function Chatlist({ mychannel }) {
    const [allchannels, setAllchannels] = useState([]);
    const [owners, setOwners] = useState([]);

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
            allchannels.map((channel, i) => {
                return (
                    <div key={i} class="table-row">
                        <div class="table-data">{channel.title}</div>
                        <div class="table-data modifier">
                            <a href="#">
                                <img width="20" height="20" src={i % 2 == 0 ? edit_white : edit} />
                            </a>
                        </div>
                        <div class="table-data supprimer">
                            <img onClick={() => deleteChannel(channel.id)} width="20" height="20" src={i % 2 == 0 ? deleteimage_white : deleteimage} />
                        </div>
                        <div class="table-data voir">
                            <a href="#">
                                <img width="20" height="20" src={i % 2 == 0 ? see_white : see} />
                            </a>
                        </div>
                    </div>
                )
            }) : allchannels.map((channel, i) => {
                return (
                    <div key={i} class="table-row">
                        <div class="table-data">{channel.title}</div>
                        <div class="table-data">{owners[i]}</div>
                        <div class="table-data voir">
                            <a href="#">
                                <img width="20" height="20" src={i % 2 == 0 ? see_white : see} />
                            </a>
                        </div>
                    </div>
                )
            });

    const findOwnerName = () => {
        allchannels.map((channel) => {
            APIService.getUser(channel.owner).then((data) => {
                owners.push(data.firstName + ' ' + data.lastName);
            })
        })
    }

    useEffect(() => {
        let fct = mychannel ?
            APIService.getMyChannels(1) : APIService.getAllChannels();
        fct
            .then((data) => {
                setAllchannels(data)
            });
        if (mychannel == false) {
            findOwnerName();
        }
    }, [mychannel ? APIService.getAllChannels() : APIService.getMyChannels(1)]);

    return (
        <div class="table">
            <form method="get" noValidate>
                <input type="text" name="text" id="text" class="search" placeholder="Rechercher un chat..." />
            </form>
            <div class="table-header">
                <div class="header__item">
                    <h4>chat</h4>
                </div>
                {mychannel ? null :
                    <div class="header__item">
                        <h4>propriétaire</h4>
                    </div>}
                {mychannel ? <div class="header__item">
                    <h4>modifier</h4>
                </div> : null}
                {mychannel ? <div class="header__item">
                    <h4>supprimer</h4>
                </div> : null}
                <div class="header__item">
                    <h4>voir</h4>
                </div>
            </div>
            <div class="table-content">
                {channels}
            </div>
        </div>
    );
}

export default Chatlist;