import "./styles/login.css"
import React, { useContext, useState } from 'react';
import { sha512 } from 'crypto-hash';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

export default function Login() {
    const [sign, setSign] = useContext(AuthContext);
    const [id, setId] = useContext(AuthContext);
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        let hash = await sha512(password);
        const object = {};
        Object.assign(object, { mail: mail, password: hash });
        try {
            let res = await fetch('http://localhost:8080/loguser', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            });
            let resJson = await res.json();
            if (resJson.id) {
                setSign(true);
                setId(resJson.id);
                navigate('/');
            } else {
                document.getElementsByClassName('login-button')[0].style.border = "5px solid #e74c3c";
                document.getElementsByClassName('form-control')[0].style.color = "#e74c3c";
                document.getElementsByClassName('form-control')[1].style.color = "#e74c3c";
                document.getElementsByClassName('chevron')[0].style.color = "#e74c3c";
            }
        } catch (err) {
            console.log(err);
            document.getElementsByClassName('login-button')[0].style.border = "5px solid #e74c3c";
            document.getElementsByClassName('form-control')[0].style.color = "#e74c3c";
            document.getElementsByClassName('form-control')[1].style.color = "#e74c3c";
            document.getElementsByClassName('chevron')[0].style.color = "#e74c3c";
        }
    };

    return (
        <div className="text-center">
            <div className="logo">connexion</div>
            <div className="login-form-1">
                <form onSubmit={(e) => handleSignIn(e)} id="login-form" className="text-left">
                    <div className="login-form-main-message"></div>
                    <div className="main-login-form">
                        <div className="login-group">
                            <div className="form-group">
                                <input value={mail} onChange={(e) => setMail(e.target.value)} type="text" className="form-control" id="lg_username" name="lg_username" placeholder="username" />
                            </div>
                            <div className="form-group">
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="lg_password" name="lg_password" placeholder="password" />
                            </div>
                        </div>
                        <button type="submit" className="login-button"><i className="chevron">&gt;</i></button>
                    </div>
                </form>
            </div>
        </div>
    )
}
