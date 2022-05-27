import "./styles/addchat.css"
import { useState } from "react";

function AddChat() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    let handleSubmit = async (e) => {
        const object = { title: 'fvjcx', description: 'kbkjb' };
        try {
            let res = await fetch('http://localhost:8080/addchannel', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: object
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setTitle("");
                setDescription("");
                console.log("User created successfully");
            } else {
                console.log("Some error occured");
            }
        } catch (err) {
            console.log("error" + err);
        }
    };

    return (
        <form class="form-text" onSubmit={handleSubmit}>
            <div class="input">
                <input type="text" class="input-field" onChange={(e) => setTitle(e.target.value)} required />
                <label class="input-label">Titre</label>
            </div>
            <div class="input">
                <input type="text" class="input-field" onChange={(e) => setDescription(e.target.value)} required />
                <label class="input-label">Description</label>
            </div>
            <div class="action">
                <button class="action-button" type="submit">Valider</button>
            </div>
        </form >
    );
}

export default AddChat;