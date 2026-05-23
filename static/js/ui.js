export function showResponse(text, mood) {

    const moodText = document.getElementById("mood");

    moodText.textContent = `Mood: ${mood}`;

    document.body.className = `theme-${mood}`;

    const responseBox = document.getElementById("response");

    responseBox.innerHTML =
        `<span class="bot-response">${text}</span>`;
}
