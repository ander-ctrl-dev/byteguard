export async function sendMessage(message) {
  const res = await fetch("/think", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  return res.json();
}
