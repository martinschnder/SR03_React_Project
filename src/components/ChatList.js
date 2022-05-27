import "./styles/chatlist.css";
import edit from './visuals/edit.png';
import edit_white from './visuals/edit_white.png';
import deleteimage from './visuals/delete.png';
import deleteimage_white from './visuals/delete_white.png';
import see from './visuals/see.png';
import see_white from './visuals/see_white.png';
import { useEffect, useState } from "react";
import APIService from "../utils/APIService";

function Chatlist({ mychannel, owner }) {
    const [allchannels, setAllchannels] = useState([]);

    const channels =
        // mychannel ?
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
                        <a href="#">
                            <img width="20" height="20" src={i % 2 == 0 ? deleteimage_white : deleteimage} />
                        </a>
                    </div>
                    <div class="table-data voir">
                        <a href="#">
                            <img width="20" height="20" src={i % 2 == 0 ? see_white : see} />
                        </a>
                    </div>
                </div>
            )
        });
    // }) : allchannels.map((name, i) => {
    //     return (
    //         <div key={i} class="table-row">
    //             <div class="table-data">{name}</div>
    //             <div class="table-data">{owner[i]}</div>
    //             <div class="table-data voir">
    //                 <a href="#">
    //                     <img width="20" height="20" src={i % 2 == 0 ? see_white : see} />
    //                 </a>
    //             </div>
    //         </div>
    //     )
    // });

    useEffect(() => {
        APIService.getAllChannels().then((data) => {
            setAllchannels(data);
        });
    }, []);

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