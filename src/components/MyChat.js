import Header from "./Header";
import Chatlist from "./ChatList";

function MyChat() {
    return (
        <main className="main">
            <Header title="Mes chats" />
            <Chatlist mychannel={true} />
        </main>
    );
}

export default MyChat;