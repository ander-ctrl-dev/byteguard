import "./api.js";

const input = document.getElementById("user-input");
const responseBox = document.getElementById("response");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", askPings);
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        askPings();
    }
});

async function askPings() {

    const question = input.value.trim();

    if (!question) return;

    responseBox.textContent = "Thinking...";

    try {

        const response = await fetch("/think", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: question
            })

        });

        const data = await response.json();

        responseBox.textContent = data.response;

    }

    catch (error) {

        responseBox.textContent =
            "Something went wrong.";

        console.error(error);

    }

}