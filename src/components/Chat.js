import './styles/chat.css';

function Chat() {
    const writeButton = document.getElementById('write-button');
    writeButton.addEventListener('click', function (event) {
        const textInput = document.getElementById("text");
        const buttonDiv = document.getElementsByClassName("button-container")[0];
        writeButton.style.display = "none";
        textInput.style.display = "block";
        buttonDiv.style.display = "block";
    })

    const closeButton = document.getElementById('close-button');
    closeButton.addEventListener('click', function (event) {
        const writeButton = document.getElementById('write-button');
        const textInput = document.getElementById("text");
        const buttonDiv = document.getElementsByClassName("button-container")[0];
        textInput.style.display = "none";
        buttonDiv.style.display = "none";
        writeButton.style.display = "block";
    })

    const message = (name, content, time) => {
        return (
            <div class="container">
                <h4>{name}</h4>
                <p>{content}</p>
                <span class="time">{time}</span>
            </div>
        )
    };

    return (
        <div class="messages-container">
            {message("paul", "salut bob", "11:00")}
            {message("martin", "salut paul", "11:05")}
            <form method="get" id="userForm" class="form_undisplay" novalidate>
                <input type="text" name="text" id="text" class="write-input" placeholder="Votre message..." />
            </form>
            <button class="write-button" id="write-button">Ecrire</button>
            <div class="button-container">
                <button class="send-button" id="send-button">Envoyer</button>
                <button class="close-button" id="close-button">Fermer</button>
            </div>
        </div>
    );
}

export default Chat;

