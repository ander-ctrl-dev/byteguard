const input = document.getElementById("user-input");
const responseBox = document.getElementById("response");

export function showResponse(text) {
    responseBox.textContent = "";
    
    let i = 0;

    function type() {
        if (i < text.length) {
            responseBox.textContent += text.charAt(i);
            i++;
            setTimeout(type, 20);
        }
    }

    type();
}

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        document.getElementById("send-btn").click();
    }
});
