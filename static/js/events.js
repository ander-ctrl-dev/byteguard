import { handleMessage } from "./main.js";

export function setupEvents() {
    const input = document.getElementById("user-input");

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            const message = input.value.trim();
            if (!message) return;

            input.value = "";
            handleMessage(message);
        }
    });
}
