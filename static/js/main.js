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

const promptChips = document.querySelectorAll(".prompt-chip");
const inputField = document.querySelector("input");



promptChips.forEach(chip => {

    chip.addEventListener("click", () => {

        let prompt = chip.textContent;

        if (prompt.includes("math")) {
            inputField.value = "What is five times ten?";
        } else {
            inputField.value = prompt;
        }

        inputField.focus();
    });

});

const diagTabs = document.querySelectorAll(".diag-tab");

diagTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const card = tab.parentElement;

        card.classList.toggle("active");

    });

});
const diagToggle = document.getElementById("diag-toggle");
const diagPanel = document.getElementById("diagnostics-panel");

diagToggle.addEventListener("click", () => {
    diagPanel.classList.toggle("show-diags");
});
