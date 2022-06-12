import "./styles/form.css"
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import APIService from "../utils/APIService";
import deleteimage from './visuals/delete.png';
import deleteimage_white from './visuals/delete_white.png';
import addimage from './visuals/add.png';
import addimage_white from './visuals/add_white.png';
import { AuthContext } from "../utils/AuthContext";

function Form({ channel, titre, desc }) {
    const [title, setTitle] = useState(titre);
    const [description, setDescription] = useState(desc);
    const [guests, setGuests] = useState([]);
    const [noguests, setNoguests] = useState([]);
    const [id] = useContext(AuthContext);
    const [nb, setNb] = useState(0);

    const navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();
        const object = {};
        if (channel) {
            Object.assign(object, { id: channel, title: title, description: description, ownerId: id });
        } else {
            Object.assign(object, { title: title, description: description, ownerId: id });
        }
        try {
            let res = await fetch('http://localhost:8080/addchannel', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            });
            if (res.status === 200) {
                navigate('/mychannels');
            } else {
                console.log("Some error occured");
            }
        } catch (err) {
            console.log("error : " + err);
        }
    };

    let deleteGuest = async (channel, guest, i) => {
        const object = { user: guest, channel: channel };
        try {
            let res = await fetch('http://localhost:8080/deleteguest', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            });
            if (res.status === 200) {
                console.log("Guest deleted successfully");
                setNb(nb - 1);
            } else {
                console.log("Some error occured");
            }
        } catch (err) {
            console.log("error" + err);
        }
    };

    let addGuest = async (channel, guest, i) => {
        const object = { user: guest, channel: channel };
        try {
            let res = await fetch('http://localhost:8080/addguest', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            });
            if (res.status === 200) {
                console.log("guest added");
                setNb(nb + 1);
            } else {
                console.log("Some error occured");
            }
        } catch (err) {
            console.log("error : " + err);
        }
    };

    const allComponent = (
        <>
            <p className="label" > Invités</p >
            {guests.length === 0 ?
                <p>Il n'y a pas d'invité dans ce chat.</p> :
                <div className="table">
                    <div className="table-header">
                        <div className="header__item">
                            <h4>utilisateur</h4>
                        </div>
                        <div className="header__item">
                            <h4>supprimer du chat</h4>
                        </div>
                    </div>
                    <div className="table-content">
                        {guests.map((guest, i) => {
                            return (
                                <div key={i} className="table-row">
                                    <div className="table-data">{guest.firstName + ' ' + guest.lastName}</div>
                                    <div className="table-data">
                                        <img alt="" width="20" height="20" onClick={() => deleteGuest(channel, guest.id, i)} src={i % 2 === 0 ? deleteimage_white : deleteimage} />
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
            <p className="label">Utilisateurs</p>
            <div className="table">
                <div className="table-header">
                    <div className="header__item">
                        <h4>utilisateur</h4>
                    </div>
                    <div className="header__item">
                        <h4>ajouter au chat</h4>
                    </div>
                </div>
                <div className="table-content">
                    {noguests.map((guest, i) => {
                        return (
                            <div key={i} className="table-row">
                                <div className="table-data">{guest.firstName + ' ' + guest.lastName}</div>
                                <div className="table-data">
                                    <img alt="" width="20" height="20" onClick={() => addGuest(channel, guest.id, i)} src={i % 2 === 0 ? addimage_white : addimage} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )

    useEffect(() => {
        if (channel) {
            APIService.getNoneGuests(channel).then((data) => {
                setNoguests(data);
            });
            APIService.getGuests(channel).then((data) => {
                setGuests(data)
            });
        }
        setNb(guests.length);
    }, [nb]);

    return (
        <form className="form-text" onSubmit={(e) => handleSubmit(e)}>
            <div className="input">
                <input type="text" className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <label className="input-label">Titre</label>
            </div>
            <div className="input">
                <input type="text" className="input-field" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <label className="input-label">Description</label>
            </div>
            {channel ? allComponent : null}
            {channel ? noGuestComponent : null}
            <div className="action">
                <button className="action-button" type="submit">Valider</button>
            </div>
        </form >
    );
}

export default Form;