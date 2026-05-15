import { showResponse } from "./ui.js";
import "./api.js";
const logsBox = document.getElementById("logsBox");

document.addEventListener("DOMContentLoaded", () => {

    const inputEl = document.getElementById("user-input");

    inputEl.addEventListener("keydown", async (e) => {

        if (e.key === "Enter") {

            e.preventDefault();

            sendMessage();
        }
    });
});

function addLog(text, type) {

    const log = document.createElement("div");

    log.className = `log ${type}`;

    log.textContent = text;

    logsBox.appendChild(log);

    if (logsBox.children.length > 4) {
        logsBox.removeChild(logsBox.firstChild);
    }
}
function clearLogs() {
    logsBox.innerHTML = "";
}

window.clearLogs = clearLogs;
window.addLog = addLog;