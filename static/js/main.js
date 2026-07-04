// PINGS FUNCTIONS //
console.log("askPings called");
import { askPings } from "./api.js";

const input = document.getElementById("user-input");
const responseBox = document.getElementById("response");
const sendBtn = document.getElementById("send-btn");

if (input && responseBox && sendBtn) {

    sendBtn.addEventListener("click", sendMessage);

    input.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

            e.preventDefault();

            sendMessage();

        }

    });

}
async function sendMessage() {
    const question = input.value.trim();

    if (!question) return;

    responseBox.textContent = "Thinking...";

    try {
        const data = await askPings(question);
        responseBox.textContent = data.response;
    }
    catch (err) {
        console.error(err);
        responseBox.textContent = "Something went wrong.";
    }
}

// TERMINAL FUNCTIONS // 
const book = document.getElementById("terminalBook");
const terminal = document.getElementById("terminalOverlay");
const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");

book.addEventListener("click", () => {

    terminal.style.display = "flex";

});

terminalInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        runCommand(terminalInput.value);

        terminalInput.value = "";
    }

});

function runCommand(command){

    command = command.trim().toLowerCase();
        if (command.startsWith("cat ")) {

    const file = command.substring(4);

    switch(file) {

        case "networking.txt":
            terminalOutput.innerHTML +=
            "<br>Networking+ Notes" +
            "<br>- TCP = reliable" +
            "<br>- UDP = fast" +
            "<br>- DNS resolves names" +
            "<br>- DHCP assigns IPs";
            break;
            return;

        case "linux.txt":
            terminalOutput.innerHTML +=
            "<br>Useful Linux Commands" +
            "<br>ls - list files" +
            "<br>pwd - current directory" +
            "<br>cat - read file" +
            "<br>cd - change directory";
            break;
            return;

        case "ged_math.txt":
            terminalOutput.innerHTML +=
            "<br>GED Math Victory Notes" +
            "<br>- Slope = rise/run" +
            "<br>- y = mx + b" +
            "<br>- Breathe. Read twice.";
            break;
            return;

        case "favorite_book.txt":
            terminalOutput.innerHTML +=
            "<br>Favorite Book" +
            "<br>Haunting Adeline";
            break;
            return;

        case "duck.txt":
            terminalOutput.innerHTML +=
            "<br>The duck refuses to elaborate." +
            "<br>Quack.";
            break;
            return;

        default:
            terminalOutput.innerHTML +=
            `<br>cat: ${file}: No such file`;
            return;
    }

    return;
}

    switch(command){

        case "help":
            terminalOutput.innerHTML += "<br>Commands: help, clear, ls, cat, exit, resetduck, duckstats, quack";
            break;

        case "clear":
            terminalOutput.innerHTML = "";
            break;

        case "exit":
            terminal.style.display = "none";
            break;
        case "pwd":
            terminalOutput.innerHTML += "<br>/home/byteguard";
            break;
        case "whoami":
            terminalOutput.innerHTML += "<br>guest";
            break;
        case "date":
            terminalOutput.innerHTML += `<br>${new Date()}`;
            break;
        case "duck":
            terminalOutput.innerHTML += "<br>The duck salutes you.";
            break;
        case "meow":
            terminalOutput.innerHTML += "<br>The robot cat refuses.";
            break;
        case "ls":
            terminalOutput.innerHTML += `
            <br>networking.txt
            <br>linux.txt
            <br>ged_math.txt
            <br>duck.txt
            <br>favorite_book.txt
            `;
            break;

        case "cat":
            terminalOutput.innerHTML += "<br>Usage: cat filename";
            break;

        case "resetduck":
            duckClicks = 0;
            localStorage.setItem("duckClicks", duckClicks);
            terminalOutput.innerHTML += `
                <br>Initializing Duck Memory...
                <br>Removing breadcrumbs...
                <br>Removing trust...
                <br>Removing friendship...
                <br>
                <br>Done.
                <br>
                <br>The duck no longer recognizes you.
                `;

        default:
            terminalOutput.innerHTML += `<br>Command not found: ${command}`;
    }

}

// ALL DUCK RELATED FUNCTIONS // 
function quack() {
    const speech = new SpeechSynthesisUtterance("Quack!");
    speech.rate = 1.4;
    speech.pitch = 2;

    speechSynthesis.speak(speech);
}

function duckSpeak(){

    const bubble = document.getElementById("duckSpeech");

    let message;

    switch(duckClicks){

        case 1:
            message = "Quack!";
            break;

        case 2:
            message = "Quack?";
            break;

        case 3:
            message = "You clicked me again.";
            break;

        case 5:
            message = "I'm just a duck.";
            break;

        case 8:
            message = "...quack.";
            break;

        case 10:
            message = "🏆 Duck Enthusiast";
            break;
        
        case 15:
            message = "I don't actually know networking.";
            break;


        case 20:
            message = "Okay now it's getting weird.";
            break;

        case 30:
            message = "Have you tried turning the router into breadcrumbs?";
            break;

        case 50:
            message = "Fine. We're friends now.";
            break;

        case 75:
        message = "I have no further wisdom.";
        break;
        
        case 100:
            message = "The duck has accepted you as flock leader.";
            break;

        case 150:
            message = "The bookshelf is judging us.";
            break;

        case 250:
            message = "You have spent an alarming amount of time clicking a rubber duck.";
            break;

        case 300:
            message = "Please go study Linux.";
            break;

        case 400:
            message = "QuackGPT has reached its limit.";
            break;

        case 500:
            message = "Achievement: Terminally quacked.";
            break;

        case 1000:
            message = "Developer ending unlocked. There's for real nothing after this.";
            break;


        default:
            message = "Quack!";
    }

    bubble.textContent = message;

    bubble.style.opacity = 1;

    clearTimeout(window.duckTimeout);

    window.duckTimeout = setTimeout(()=>{
        bubble.style.opacity = 0;
    },1800);

}
const duck = document.querySelector(".duck");

let duckClicks = Number(localStorage.getItem("duckClicks")) || 0;

duck.addEventListener("click", () => {

    duckClicks++;

    localStorage.setItem("duckClicks", duckClicks);

    duckSpeak();
    quack();

});

// BOOK RELATED FUNCTIONS // 
const overlay=document.getElementById("bookOverlay");
const title=document.getElementById("bookTitle");
const content=document.getElementById("bookContent");
const closeBook=document.getElementById("closeBook");


document.querySelectorAll(".book").forEach(book => {

    book.addEventListener("click", () => {

        openBook(book.dataset.lesson);

    });

});

const books={

    networking:{

        title:"Networking+",

        content:`

        <h2>Chapter One</h2>

        <p>Packets are tiny envelopes...</p>

        `
    },

    linux:{

        title:"Linux",

        content:`

        <h2>Welcome.</h2>

        `
    },

    pragmatic:{

        title:"The Pragmatic Programmer",

        content:`

        <h2>Thinking Like A Developer</h2>

        `
    }

};

function openBook(name) {

    const lesson = books[name];

    if (!lesson) {
        console.log("Book not found:", name);
        return;
    }

    title.textContent = lesson.title;
    content.innerHTML = lesson.content;

    overlay.classList.remove("hidden");
}
    closeBook.onclick=()=>{

    overlay.classList.add("hidden");

};

// HARDWARE LAB //
const hardwareProject = document.getElementById("hardwareProject");
hardwareProject.addEventListener("click", openHardwareLab);

function openHardwareLab(){

    title.textContent = "Welcome to Pings' Workbench";

    document.querySelector(".rightPage").innerHTML = `
        <div id="pingsSketch">

            <h3>To Do:</h3>

            <ul>
                <li>✓ Find screwdriver</li>
                <li>☐ Install CPU</li>
                <li>☐ Install RAM</li>
                <li>☐ Install GPU</li>
                <li>☐ Don't panic</li>
            </ul>

        </div>
    `;

    content.innerHTML = `
        <p>
            Looks like Pings took his computer apart...
            and now needs a little help putting it back together.
        </p>

        <button id="beginHardware" class="build-btn">
            Build the PC →
        </button>
    `;

    overlay.classList.remove("hidden");
}


