import Header from "./Header";
import Chatlist from "./ChatList";

function Home() {
    return (
        <main className="main">
            <Header title="Tous les chats" />
            <Chatlist mychannel={false} />
        </main>
    );
}

export default Home;