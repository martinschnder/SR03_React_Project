import "./styles/form.css"
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import APIService from "../utils/APIService";
import Header from "./Header";
import { AuthContext } from "../utils/AuthContext";

function ModifyUser() {
    const navigate = useNavigate();

    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [email, setEmail] = useState();
    const [realpassword, setRealpassword] = useState();
    const [previouspassword, setPreviouspassword] = useState();
    const [newpassword, setNewpassword] = useState();
    const [id] = useContext(AuthContext);
    const [alertmessage, setAlertmessage] = useState('');

    let handleSubmit = async (e) => {
        if (realpassword != previouspassword) {
            setAlertmessage("L'ancien mot de passe n'est pas le bon.");
            return
        }
        e.preventDefault();
        const object = {};
        Object.assign(object, { id: id, firstName: prenom, lastName: nom, mail: email });
        try {
            let res = await fetch('http://localhost:8080/modifyuser', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            });
            if (res.status === 200) {
                navigate('/');
            } else {
                console.log("Some error occured");
            }
        } catch (err) {
            console.log("error : " + err);
        }
    };

    useEffect(() => {
        APIService.getUser(id).then((data) => {
            setEmail(data.mail);
            setPrenom(data.firstName);
            setNom(data.lastName);
            setRealpassword(data.password);
        });
    }, [id]);

    return (
        <main className="main">
            <Header title="Modifier mes informations" />
            <form className="form-text" onSubmit={(e) => handleSubmit(e)}>
                <div className="input">
                    <input type="text" className="input-field" value={nom} onChange={(e) => setNom(e.target.value)} required />
                    <label className="input-label">Nom</label>
                </div>
                <div className="input">
                    <input type="text" className="input-field" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                    <label className="input-label">Prénom</label>
                </div>
                <div className="input">
                    <input type="text" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label className="input-label">Email</label>
                </div>
                <div className="input">
                    <input type="password" className="input-field" value={previouspassword} onChange={(e) => setPreviouspassword(e.target.value)} required />
                    <label className="input-label">Ancien mot de passe</label>
                </div>
                <div className="input">
                    <input type="password" className="input-field" value={newpassword} onChange={(e) => setNewpassword(e.target.value)} required />
                    <label className="input-label">Nouveau mot de passe</label>
                </div>
                {alertmessage != '' ? <p className="alerte">{alertmessage}</p> : null}
                <div className="action">
                    <button className="action-button" type="submit">Valider</button>
                </div>
            </form >
        </main>
    );
}

export default ModifyUser;