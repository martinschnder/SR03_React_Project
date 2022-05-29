import Form from "./Form";
import Header from "./Header";

function AddChat() {
    return (
        <main className="main">
            <Header title="Ajouter un nouveau chat" />
            <Form channel={false}></Form>
        </main>
    );
}

export default AddChat;