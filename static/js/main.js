import { showResponse } from "./ui.js";
import "./api.js";

const input = document.getElementById("user-input");
const response = document.getElementById("response");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", askPings);

function askPings() {

    const question = input.value.toLowerCase();

    if (question.includes("wifi")) {
        response.textContent =
            "Wi-Fi issues are usually caused by distance, interference, or router problems.";
    }

    else if (question.includes("ip")) {
        response.textContent =
            "An IP address is like a mailing address for your device.";
    }

    else {
        response.textContent =
            "I'm still learning that topic.";
    }
}

