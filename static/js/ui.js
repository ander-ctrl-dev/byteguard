const input = document.getElementById("user-input");

  export function showResponse(text) {

    console.log("showResponse fired");
    console.log("text:", text);

    const responseBox = document.getElementById("response");

    console.log("responseBox:", responseBox);

    responseBox.textContent = text;
}