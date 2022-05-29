import Form from "./Form";
import Header from "./Header";

function AddChat() {
    return (
        <main className="main">
            <Header title="Ajouter un nouveau chat" />
            <Form channel={0}></Form>
        </main>
    );
}

export default AddChat;