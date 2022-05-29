import "./styles/form.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import APIService from "../utils/APIService";
import deleteimage from './visuals/delete.png';
import deleteimage_white from './visuals/delete_white.png';
import addimage from './visuals/add.png';
import addimage_white from './visuals/add_white.png';

function Form({ channel, titre, desc }) {
    const [title, setTitle] = useState(titre);
    const [description, setDescription] = useState(desc);
    const [guests, setGuests] = useState([]);
    const [noguests, setNoguests] = useState([]);

    const navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();
        const object = {};
        if (channel) {
            Object.assign(object, { id: channel, title: title, description: description });
        } else {
            Object.assign(object, { title: title, description: description });
        }
        try {
            let res = await fetch('http://localhost:8080/addchannel', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            });
            let resJson = await res.json();
            if (res.status === 200) {
                navigate('/mychannels');
            } else {
                console.log("Some error occured");
            }
        } catch (err) {
            console.log("error : " + err);
        }
    };

    let deleteGuest = async (channel, guest) => {
        const object = { user: guest, channel: channel };
        try {
            let res = await fetch('http://localhost:8080/deleteguest', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            });
            // let resJson = await res.json();
            if (res.status === 200) {
                console.log("Guest deleted successfully");
            } else {
                console.log("Some error occured");
            }
        } catch (err) {
            console.log("error" + err);
        }
    };

    let addGuest = async (channel, guest) => {
        const object = { user: guest, channel: channel };
        try {
            let res = await fetch('http://localhost:8080/addguest', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            });
            let resJson = await res.json();
            if (res.status === 200) {
                console.log("guest added");
            } else {
                console.log("Some error occured");
            }
        } catch (err) {
            console.log("error : " + err);
        }
    };

    const allComponent = (
        <>
            <p class="label" > Invités</p >
            {guests.length == 0 ?
                <p>Il n'y a pas d'invité dans ce chat.</p> :
                <div class="table">
                    <div class="table-header">
                        <div class="header__item">
                            <h4>utilisateur</h4>
                        </div>
                        <div class="header__item">
                            <h4>supprimer</h4>
                        </div>
                    </div>
                    <div class="table-content">
                        {guests.map((guest, i) => {
                            return (
                                <div key={i} class="table-row">
                                    <div class="table-data">{guest.firstName + ' ' + guest.lastName}</div>
                                    <div class="table-data">
                                        <img width="20" height="20" onClick={() => deleteGuest(channel, guest.id)} src={i % 2 == 0 ? deleteimage_white : deleteimage} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            }
        </>
    )

    const noGuestComponent = (
        <>
            <p class="label">Utilisateurs</p>
            <div class="table">
                <div class="table-header">
                    <div class="header__item">
                        <h4>utilisateur</h4>
                    </div>
                    <div class="header__item">
                        <h4>ajouter</h4>
                    </div>
                </div>
                <div class="table-content">
                    {noguests.map((guest, i) => {
                        return (
                            <div key={i} class="table-row">
                                <div class="table-data">{guest.firstName + ' ' + guest.lastName}</div>
                                <div class="table-data">
                                    <img width="20" height="20" onClick={() => addGuest(channel, guest.id)} src={i % 2 == 0 ? addimage_white : addimage} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )

    const allguests =
        guests.map((guest, i) => {
            return (
                <div key={i} class="table-row">
                    <div class="table-data">{guest.firstName + ' ' + guest.lastName}</div>
                    <div class="table-data">
                        <img width="20" height="20" onClick={() => deleteGuest(channel, guest.id)} src={i % 2 == 0 ? deleteimage_white : deleteimage} />
                    </div>
                </div>
            )
        });

    const noneguests =
        noguests.map((guest, i) => {
            return (
                <div key={i} class="table-row">
                    <div class="table-data">{guest.firstName + ' ' + guest.lastName}</div>
                    <div class="table-data">
                        <img width="20" height="20" onClick={() => addGuest(channel, guest.id)} src={i % 2 == 0 ? addimage_white : addimage} />
                    </div>
                </div>
            )
        });

    useEffect(() => {
        if (channel) {
            APIService.getGuests(channel).then((data) => {
                setGuests(data)
            });
            APIService.getNoneGuests(channel).then((data) => {
                setNoguests(data)
            });
        }
    }, [channel ? APIService.getGuests(channel) : null, channel ? APIService.getNoneGuests(channel) : null]);

    return (
        <form class="form-text" onSubmit={(e) => handleSubmit(e)}>
            <div class="input">
                <input type="text" class="input-field" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <label class="input-label">Titre</label>
            </div>
            <div class="input">
                <input type="text" class="input-field" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <label class="input-label">Description</label>
            </div>
            {channel ? allComponent : null}
            {channel ? noGuestComponent : null}
            <div class="action">
                <button class="action-button" type="submit">Valider</button>
            </div>
        </form >
    );
}

export default Form;