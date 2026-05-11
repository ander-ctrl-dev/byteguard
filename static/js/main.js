import { setupEvents } from "./events.js";
import { sendMessage } from "./api.js";
import { displayResponse } from "./ui.js";

export function handleMessage(message) {
    sendMessage(message).then(data => {
        displayResponse(data.response);
    });
}

document.addEventListener("DOMContentLoaded", () => {

  const inputEl = document.getElementById("user-input");
  const mood = document.getElementById("moodBox");

  inputEl.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  inputEl.addEventListener("input", () => {
    mood.textContent = "Mood: thinking...";
  });

  async function sendMessage() {
    const value = inputEl.value;
    if (!value.trim()) return;

    inputEl.value = "";
    inputEl.disabled = true;

    try {
      const res = await fetch("/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: value })
      });

      const data = await res.json();
      updateResponse(data.response);

    } catch (err) {
      console.error(err);
    }

    inputEl.disabled = false;
    inputEl.focus();
    mood.textContent = "Mood: neutral";
  }

});

async function getLocalWeather() {

    navigator.geolocation.getCurrentPosition(

        async (position) => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const res = await fetch("/local-weather", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    lat,
                    lon
                })
            });

            const data = await res.json();

            document.getElementById("response").innerText =
                data.response;

            document.getElementById("moodBox").innerText =
                `Mood: ${data.mood}`;
        }
    );
}