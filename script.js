const firebaseConfig = {
    apiKey: "AIzaSyDvsbSgcc0GVG5qiJz_6onO3ZtKx6AT0YE",
    authDomain: "bhh-chatbot.firebaseapp.com",
    databaseURL: "https://bhh-chatbot-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bhh-chatbot",
    storageBucket: "bhh-chatbot.appspot.com",
    messagingSenderId: "462999270066",
    appId: "1:462999270066:web:e54f69725a1064feaacfab",
    measurementId: "G-25LXV3YTB7"
};

document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.toggle("dark-mode");
});
const darkModeToggle = document.getElementById("toggle-dark-mode");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});


// init firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
fetchKeywords();
const chatOutput = document.getElementById("chat-output");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", () => {
    const message = chatInput.value.trim();
    if (message.length > 0) {
        addMessageToChat("User", message);
        chatInput.value = "";
        processUserMessage(message);
    }
});

async function fetchKeywords() {
    const dbRef = firebase.database().ref("keywords");
    const snapshot = await dbRef.once("value");
    return snapshot.val()
}

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});

function addMessageToChat(sender, message) {
    const messageElement = document.createElement("div");
    const messageText = document.createElement("div");
    messageText.innerHTML = message;
    messageText.className = sender === "User" ? "user-message" : "chatbot-message";
    messageElement.appendChild(messageText);
    chatOutput.appendChild(messageElement);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

async function generateChatbotResponse(message) {
    let keywords = await fetchKeywords();
    let keys = Object.keys(keywords);
    for (let i = 0; i < keys.length; i++) {
        if (message.includes(keys[i])) {
            if (typeof keywords[keys[i]] === 'object') {
                let keykeys = Object.keys(keywords[keys[i]]);
                for (let k = 0; k < keykeys.length; k++) {
                    if (message.includes(keykeys[k])) {
                        return keywords[keys[i]][keykeys[k]];
                    }
                }
                return keywords[keys[i]]["default"];
            }
            return keywords[keys[i]];
        }
    }
    let messages = document.getElementsByClassName('chatbot-message')
    if (messages[messages.length-1]) {
        if (messages[messages.length-1].innerText === keywords["default"]){
            return keywords["failure"]
        }
        return keywords["default"]
    }
    return keywords["default"];
}


function getFormattedDateAndTime() {
    const now = new Date();
    const timeZone = 'Etc/GMT-2';

    const dateFormatter = new Intl.DateTimeFormat('en-GB', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const timeFormatter = new Intl.DateTimeFormat('en-GB', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    const formattedDate = dateFormatter.format(now);
    const formattedTime = timeFormatter.format(now);

    return `${formattedDate} ${formattedTime}`;
}

async function processUserMessage(message) {
    const response = await generateChatbotResponse(message);
    const keywords = await fetchKeywords();
    const defaultKeywordValue = keywords["default"];


    if (response === defaultKeywordValue || !response) {
        const chatsRef = firebase.database().ref("chats");
        const newChatRef = chatsRef.push();

        const messageRef = newChatRef.child("messages");
        const newMessageRef = messageRef.push();
        await newMessageRef.set({
            sender: "User",
            message: message,
            timestamp: getFormattedDateAndTime(),
        });

        if (response) {
            const newResponseRef = messageRef.push();
            await newResponseRef.set({
                sender: "Chatbot",
                message: response,
                timestamp: getFormattedDateAndTime(),
            });
        }
    }

    addMessageToChat("Chatbot", response);
}















