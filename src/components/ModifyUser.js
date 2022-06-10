import "./styles/form.css"
import { sha512 } from "crypto-hash";
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
    const [passwordrepetition, setPasswordRepetition] = useState();
    const [id] = useContext(AuthContext);
    const [alertmessage, setAlertmessage] = useState('');

    let handleSubmit = async (e) => {
        e.preventDefault();
        let hash = await sha512(previouspassword);
        if (realpassword !== hash) {
            setAlertmessage("L'ancien mot de passe n'est pas le bon.");
            return
        }
        if (newpassword !== passwordrepetition) {
            setAlertmessage("Les deux nouveaux mots de passe ne correspondent pas.");
            return
        }
        var mailformat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!email.match(mailformat)) {
            setAlertmessage("Email non valide.");
            return;
        }
        const object = {};
        if (newpassword == null) {
            Object.assign(object, { id: id, firstName: prenom, lastName: nom, mail: email, password: realpassword });
        } else {
            var passwordformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            if (!newpassword.match(passwordformat)) {
                setAlertmessage("Le mot de passe doit contenir un chiffre, une minuscule, une majuscule et au moins 8 caractères");
                return;
            }
            let hashNew = await sha512(newpassword);
            Object.assign(object, { id: id, firstName: prenom, lastName: nom, mail: email, password: hashNew });
        }
        try {
            let res = await fetch('http://localhost:8080/modifyuser', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            });
            let resJson = await res.json();
            if (res.status === 200) {
                if (resJson === 1) {
                    navigate('/');
                } else if (resJson === 0) {
                    setAlertmessage("L'email est déjà affecté.");
                    return
                }
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
                    <label className="input-label">Nom *</label>
                </div>
                <div className="input">
                    <input type="text" className="input-field" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                    <label className="input-label">Prénom *</label>
                </div>
                <div className="input">
                    <input type="text" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label className="input-label">Email *</label>
                </div>
                <div className="input">
                    <input type="password" className="input-field" value={previouspassword} onChange={(e) => setPreviouspassword(e.target.value)} required />
                    <label className="input-label">Ancien mot de passe *</label>
                </div>
                <p>Si vous souhaitez modifier votre mot de passe, veuillez renseigner les champs ci-dessous.</p>
                <div className="input">
                    <input type="password" className="input-field" value={newpassword} onChange={(e) => setNewpassword(e.target.value)} />
                    <label className="input-label">Nouveau mot de passe</label>
                </div>
                <div className="input">
                    <input type="password" className="input-field" value={passwordrepetition} onChange={(e) => setPasswordRepetition(e.target.value)} />
                    <label className="input-label">Veuillez entrer de nouveau le mot de passe</label>
                </div>
                {alertmessage !== '' ? <p className="alerte">{alertmessage}</p> : null}
                <div className="action">
                    <button className="action-button" type="submit">Valider</button>
                </div>
            </form >
        </main>
    );
}

export default ModifyUser;