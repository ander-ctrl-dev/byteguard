async function askPings() {

    const question = input.value;

    response.innerHTML = "Pings is thinking...";

    const res = await fetch("/ask", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            question
        })
    });

    const data = await res.json();

    response.innerHTML = data.answer;
}