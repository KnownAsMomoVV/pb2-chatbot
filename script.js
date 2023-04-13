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

function generateChatbotResponse(message) {
    message = message.toLowerCase();
    let response = '';

    if (message.includes('hello') || message.includes('hi')) {
        response = 'Hello! How can I help you today? If you want information about topics I can help you with, write "topics".';
    } else if (message.includes('cleanbug')) {
        let messages = document.getElementsByClassName('chatbot-message')
        for (let i = 0; i<messages.length;i++) {
            if (messages[messages.length-i]) {
                if (messages[messages.length-i].innerText.includes("configuration")){
                    return `You can contact the team responsible for the configuration of the CleanBug via mail to 
                        customers-cleanbug@bugland.com, or during our office hours at +49401234567-11. You
                    can find our office hours and further information <a href="summary.html">here</a>.
                    Additionally you can have a look at the <a href="faq/cleanbug.html">FAQ about the CleanBug</a>.`
                }else if (messages[messages.length-i].innerText.includes('functionality')) {
                    return `You can contact the team responsible for the functionality of the CleanBug via mail to 
                        customers-cleanbug@bugland.com, or during our office hours at +49401234567-12. You
                    can find our office hours and further information <a href="summary.html">here</a>.
                    Additionally you can have a look at the <a href="faq/cleanbug.html">FAQ about the CleanBug</a>.`
                } else if (messages[messages.length-i].innerText.includes('questions')) {
                    return `You can contact the team responsible for the questions regarding the CleanBug via mail to 
                        customers-cleanbug@bugland.com, or during our office hours at +49401234567-13. You
                    can find our office hours and further information <a href="summary.html">here</a>.
                    Additionally you can have a look at the <a href="faq/cleanbug.html">FAQ about the CleanBug</a>.`
                } else if (messages[messages.length-i].innerText.includes('features')) {
                    return `You can contact the team responsible for the features of the CleanBug via mail to 
                        customers-cleanbug@bugland.com, or during our office hours at +49401234567-14. You
                    can find our office hours and further information <a href="summary.html">here</a>.
                    Additionally you can have a look at the <a href="faq/cleanbug.html">FAQ about the CleanBug</a>.`
                } else {
                    return `You can contact us via mail to customers-cleanbug@bugland.com, or during our office hours at +49401234567. You
                    can find our office hours and further information <a href="summary.html">here</a>.
                    Additionally you can have a look at the <a href="faq/cleanbug.html">FAQ about the CleanBug</a>.`
                }
            }
        }
        return `You can contact us via mail to customers-cleanbug@bugland.com, or during our office hours at +49401234567. You
                    can find our office hours and further information <a href="summary.html">here</a>.
                    Additionally you can have a look at the <a href="faq/cleanbug.html">FAQ about the CleanBug</a>.`
    } else if (message.includes('windowfly')) {
        let messages = document.getElementsByClassName('chatbot-message')
        for (let i = 0; i<messages.length;i++) {
            if (messages[messages.length-i]) {
                if (messages[messages.length-i].innerText.includes("configuration")){
                    return `You can contact the team responsible for the configuration of the WindowFly via mail to 
                        customers-windowfly@bugland.com, or during our office hours at +49401234567-21. You
                    can find our office hours and further information <a href="summary.html">here</a>.
                    Additionally you can have a look at the <a href="faq/windowfly.html">FAQ about the WindowFly</a>.`
                }else if (messages[messages.length-i].innerText.includes('functionality')) {
                    return `You can contact the team responsible for the functionality of the WindowFly via mail to 
                        customers-windowfly@bugland.com, or during our office hours at +49401234567-22. You
                    can find our office hours and further information <a href="summary.html">here</a>.
                    Additionally you can have a look at the <a href="faq/windowfly.html">FAQ about the WindowFly</a>.`
                } else if (messages[messages.length-i].innerText.includes('questions')) {
                    return `You can contact the team responsible for the questions regarding the WindowFly via mail to 
                        customers-windowfly@bugland.com, or during our office hours at +49401234567-23. You
                    can find our office hours and further information <a href="summary.html">here</a>.
                    Additionally you can have a look at the <a href="faq/windowfly.html">FAQ about the WindowFly</a>.`
                } else if (messages[messages.length-i].innerText.includes('features')) {
                    return `You can contact the team responsible for the features of the WindowFly via mail to 
                        customers-windowfly@bugland.com, or during our office hours at +49401234567-24. You
                    can find our office hours and further information <a href="summary.html">here</a>.
                    Additionally you can have a look at the <a href="faq/windowfly.html">FAQ about the WindowFly</a>.`
                } else {
                    return `You can contact us via mail to customers-windowfly@bugland.com, or during our office hours at +49401234567. You
                    can find our office hours and further information <a href="summary.html">here</a>.
                    Additionally you can have a look at the <a href="faq/windowfly.html">FAQ about the WindowFly</a>.`
                }
            }
        }
        return `You can contact us via mail to customers-windowfly@bugland.com, or during our office hours at +49401234567. You
                    can find our office hours and further information <a href="summary.html">here</a>.
                    Additionally you can have a look at the <a href="faq/windowfly.html">FAQ about the WindowFly</a>.`
    } else if (message.includes('gardenbeetle')) {
        let messages = document.getElementsByClassName('chatbot-message')
        for (let i = 0; i<messages.length;i++) {
            if (messages[messages.length-i]) {
                if (messages[messages.length-i].innerText.includes("configuration")){
                    return `You can contact the team responsible for the configuration of the GardenBeetle via mail to 
                        customers-gardenbeetle@bugland.com, or during our office hours at +49401234567-31. You
                    can find our office hours and further information <a href="summary.html">here</a>.
                    Additionally you can have a look at the <a href="faq/gardenbeetle.html">FAQ about the GardenBeetle</a>.`
                }else if (messages[messages.length-i].innerText.includes('functionality')) {
                    return `You can contact the team responsible for the functionality of the GardenBeetle via mail to 
                        customers-gardenbeetle@bugland.com, or during our office hours at +49401234567-32. You
                    can find our office hours and further information <a href="summary.html">here</a>.
                    Additionally you can have a look at the <a href="faq/gardenbeetle.html">FAQ about the GardenBeetle</a>.`
                } else if (messages[messages.length-i].innerText.includes('questions')) {
                    return `You can contact the team responsible for the questions regarding the GardenBeetle via mail to 
                        customers-gardenbeetle@bugland.com, or during our office hours at +49401234567-33. You
                    can find our office hours and further information <a href="summary.html">here</a>.
                    Additionally you can have a look at the <a href="faq/gardenbeetle.html">FAQ about the GardenBeetle</a>.`
                } else if (messages[messages.length-i].innerText.includes('features')) {
                    return `You can contact the team responsible for the features of the GardenBeetle via mail to 
                        customers-gardenbeetle@bugland.com, or during our office hours at +49401234567-34. You
                    can find our office hours and further information <a href="summary.html">here</a>.
                    Additionally you can have a look at the <a href="faq/gardenbeetle.html">FAQ about the GardenBeetle</a>.`
                } else {
                    return `You can contact us via mail to customers-gardenbeetle@bugland.com, or during our office hours at +49401234567. You
                    can find our office hours and further information <a href="summary.html">here</a>.
                    Additionally you can have a look at the <a href="faq/gardenbeetle.html">FAQ about the GardenBeetle</a>.`
                }
            }
        }
        return `You can contact us via mail to customers-gardenbeetle@bugland.com, or during our office hours at +49401234567. You
                    can find our office hours and further information <a href="summary.html">here</a>.
                    Additionally you can have a look at the <a href="faq/gardenbeetle.html">FAQ about the GardenBeetle</a>.`
    } else if (message.includes('how are you')) {
        response = "I'm doing well, thank you! How can I help you?";
    } else if (message.includes('what is your name')) {
        response = "I'm a simple chatbot. How can I assist you?";
    } else if (message.includes('thank you')) {
        response = "You're welcome! Let me know if you have any more questions.";
    } else if (message.includes('help') || message.includes('topics')) {
        response = "Topics I can help you with are configuration, functionality, questions and features. Just write any of those words to get information on these topics. If you need help with something else, write \"else\"";
    } else if (message.includes('configuration')) {
        response = "What devices configuration do you need assistance with? For a list of our devices write \"devices\"";
    } else if (message.includes('functionality')) {
        response = "What devices functionality do you need assistance with? For a list of our devices write \"devices\"";
    } else if (message.includes('questions')) {
        response = "What device are your questions about? For a list of our devices write \"devices\"";
    } else if (message.includes('features')) {
        response = "What devices features do you need assistance with? For a list of our devices write \"devices\"";
    } else if (message.includes('device')) {
        response = "The devices we sell are CleanBug (our innovative vacuum cleaner and mop robot), WindowFly (our innovative window cleaning robot) and GardenBeetle (our innovative lawncare robot).";
    } else if (message.includes('else')) {
        let messages = document.getElementsByClassName('chatbot-message')
        if (messages[messages.length-1]) {
            if (messages[messages.length-1].innerText.includes("configuration, functionality, questions and features")){
                return `You can contact us via mail to customers@bugland.com, or during our office hours at +49401234567. You
                    can find our office hours and further information <a href="summary.html">here</a>.`
            }
        }
        response = "I'm not sure how to respond to that. Can you please rephrase your question?";
    } else if (message.includes('yes')) {
        let messages = document.getElementsByClassName('chatbot-message')
        if (messages[messages.length-1]) {
            if (messages[messages.length-1].innerText === "It seems as though I am not able to help you. Do you want human assistance?"){
                return `You can contact us via mail to customers@bugland.com, or during our office hours at +49401234567. You
                    can find our office hours and further information <a href="summary.html">here</a>.`
            }
        }
        response = "I'm not sure how to respond to that. Can you please rephrase your question?";
    }else {
        let messages = document.getElementsByClassName('chatbot-message')
        if (messages[messages.length-1]) {
            if (messages[messages.length-1].innerText === "I'm not sure how to respond to that. Can you please rephrase your question?"){
                return "It seems as though I am not able to help you. Do you want human assistance?"
            }
        }
        response = "I'm not sure how to respond to that. Can you please rephrase your question? If you want information about topics I can help you with, write \"topics\".";
    }

    return response;
}

function getFormattedDateAndTime() {
    const now = new Date();
    const timeZone = 'Etc/GMT-2'; // Set the timezone to GMT+2

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

async function processUserMessage(message, chatId) {
    /*const messageRef = firebase.database().ref(`chats/${chatId}/messages`);
    const newMessageRef = messageRef.push();
    await newMessageRef.set({
        sender: "User",
        message: message,
        timestamp: getFormattedDateAndTime(),
    });*/

    const response = generateChatbotResponse(message);

    /*const newResponseRef = messageRef.push();
    await newResponseRef.set({
        sender: "Chatbot",
        message: response,
        timestamp: getFormattedDateAndTime(),
    });*/

    addMessageToChat("Chatbot", response);
}


/*
function loadChatHistory() {
    const messagesRef = firebase.database().ref("messages");

    // Remove any existing listeners
    messagesRef.off("value");

    messagesRef.on("value", (snapshot) => {
        const data = snapshot.val();
        chatOutput.innerHTML = ""; // Clear the chat output
        for (const key in data) {
            const messageData = data[key];
            addMessageToChat(messageData.sender, messageData.message);
        }
    });
}

loadChatHistory();
*/







