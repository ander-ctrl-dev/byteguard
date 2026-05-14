const input = document.getElementById("user-input");

export function showResponse(text) {

    const responseBox = document.getElementById("response");

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