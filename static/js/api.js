const input = document.getElementById("user-input");

async function sendMessage() {

    const message = input.value;

    if (!message.trim()) return;

    const lowerMessage = message.toLowerCase();

    input.value = "";

    logsBox.innerHTML = "";

    if (lowerMessage.includes("weather")) {

        addLog("Connecting to weather satellites...", "info");
        addLog("Analyzing atmospheric data...", "info");
        addLog("Forecast generated", "success");

    }

    else if (
        lowerMessage.includes("ping") ||
        lowerMessage.includes("network") ||
        lowerMessage.includes("internet")
    ) {

        addLog("Pinging remote host...", "info");
        addLog("Checking latency...", "warning");
        addLog("Connection stable", "success");

    }

    else if (
        lowerMessage.includes("+") ||
        lowerMessage.includes("-") ||
        lowerMessage.includes("*") ||
        lowerMessage.includes("/")
    ) {

        addLog("Initializing math engine...", "info");
        addLog("Running calculations...", "warning");
        addLog("Solution computed", "success");

    }

    else {

        addLog("Processing request...", "info");
    }

    const response = await fetch("/think", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message
        })
    });
    await new Promise(resolve => setTimeout(resolve, 800));
    const data = await response.json();
    showResponse(data.response);
}
window.sendMessage = sendMessage;