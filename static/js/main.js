console.log("askPings called");
import { askPings } from "./api.js";

const input = document.getElementById("user-input");
const responseBox = document.getElementById("response");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {
    const question = input.value.trim();

    if (!question) return;

    responseBox.textContent = "Thinking...";

    try {
        const data = await askPings(question);
        responseBox.textContent = data.response;
    }
    catch (err) {
        console.error(err);
        responseBox.textContent = "Something went wrong.";
    }
}