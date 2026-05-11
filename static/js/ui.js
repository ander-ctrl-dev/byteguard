let mouth;
let leftEye;
let rightEye;
let robot;
let card;

/*document.addEventListener("DOMContentLoaded", () => {

    console.log("JS running");

    mouth = document.querySelector(".mouth");
    leftEye = document.querySelector(".eye.left");
    rightEye = document.querySelector(".eye.right");
    robot = document.querySelector(".robot-wrapper");
    card = document.querySelector(".panel");

    console.log("robot =", robot);

    setInterval(blinkEyes, 4000);

    if (robot) {
        robot.classList.add("thinking");
        robot.classList.remove("thinking");
        robot.classList.add("happy");
    }

    addLog("Initializing scan...");
    setTimeout(() => addLog("Checking ports..."), 500);
    setTimeout(() => addLog("Scan complete ✓"), 1000);

    if (mouth) {
        mouth.classList.add("talking");
    }

}); */

export function displayResponse(text) {
  const response = document.getElementById("response");
  response.textContent = text;
}
function setTheme(theme) {
  document.body.className = theme;
}
function updateResponse(text) {
  const box = document.getElementById("response");

  box.classList.remove("updated");

  setTimeout(() => {
    box.textContent = text;
    box.classList.add("updated");
  }, 50);
}
function typeResponse(text) {
  const box = document.getElementById("response");
  box.textContent = "";

  let i = 0;

  function type() {
    if (i < text.length) {
      box.textContent += text.charAt(i);
      i++;
      setTimeout(type, 20); // speed
    }
  }

  type();
}
function typeText(text) {
    const mouth = document.getElementById("mouth");
    response.textContent = "";
    let i = 0;

    mouth.classList.add("talking");

        // random mouth jitter while talking
        mouth.style.height = (8 + Math.random() * 10) + "px";

        if (i >= text.length) {
            clearInterval(interval);

            // stop talking
            mouth.classList.remove("talking");
            mouth.style.height = "";

            // return to idle
            mouth.classList.add("idle");
        }
    }
function setMood(mood) {
    const face = document.getElementById("face");

    const colors = {
        happy: "#00ff9f",
        thinking: "#00d0ff",
        chaotic: "#ff0055",
        needy: "#ff66cc"
    };

    face.style.boxShadow = `0 0 20px ${colors[mood]}`;
}
function activateCard() {
  card.classList.add("active");

  setTimeout(() => {
    card.classList.remove("active");
  }, 600);
}
function setMouthMood(mood) {
    const mouth = document.getElementById("mouth");

    mouth.className = "mouth"; // reset

    if (mood === "happy") mouth.classList.add("happy");
    else if (mood === "chaotic") mouth.classList.add("chaotic");
    else mouth.classList.add("idle");
    setMood(data.mood);
    setMouthMood(data.mood);
}
function addLog(text) {
  const log = document.createElement("div");
  log.className = "log";
  log.textContent = text;

  document.getElementById("logsBox").appendChild(log);
}
function blinkEyes() {
  document.querySelectorAll(".eye").forEach(e => {
    e.classList.add("blink");
  });

  setTimeout(() => {
    document.querySelectorAll(".eye").forEach(e => {
      e.classList.remove("blink");
    });
  }, 200);
}
