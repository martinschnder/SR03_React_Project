import Form from "./Form";
import Header from "./Header";
import { useLocation } from "react-router-dom";

function ModifyChat() {
    const location = useLocation();
    return (
        <main className="main">
            <Header title="Modifier un chat" />
            <Form channel={location.state.channel} titre={location.state.title} desc={location.state.desc}></Form>
        </main>
    );
}

export default ModifyChat;