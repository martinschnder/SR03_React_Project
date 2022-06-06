import Header from "./Header";
import Chatlist from "./ChatList";
import { useContext, useEffect } from "react";
import { AuthContext } from "../utils/AuthContext";

function Home() {
    const [id, setId] = useContext(AuthContext);

    return (
        <main className="main">
            <Header title="Tous les chats" />
            <Chatlist mychannel={false} />
        </main>
    );
}

export default Home;