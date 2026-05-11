from flask import Flask, render_template, request, jsonify
import random, socket, subprocess, requests, re
from dotenv import load_dotenv
import os

load_dotenv()
API_KEY = os.getenv("API_KEY")
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/think", methods=["POST"])

def think():
    data = request.get_json()
    message = data.get("message", "")

    text, mood = get_response(message)

    return jsonify({
        "response": text,
        "mood": mood
    })

WEATHER_WORDS = [
    "weather",
    "forecast",
    "temperature",
    "rain",
    "snow",
    "sunny"
]

NETWORK_WORDS = [
    "internet",
    "wifi",
    "ping",
    "latency",
    "network",
    "connection"
]

GREETING_WORDS = [
    "hi",
    "hello",
    "hey",
    "yo"
]

@app.route("/local-weather", methods=["POST"])
def local_weather():

    data = request.get_json()

    lat = data.get("lat")
    lon = data.get("lon")

    url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?lat={lat}&lon={lon}&appid={API_KEY}&units=imperial"
    )

    try:

        res = requests.get(url).json()

        city = res["name"]
        temp = round(res["main"]["temp"])
        desc = res["weather"][0]["description"]

        return jsonify({
            "response": f"It's currently {temp}°F with {desc} in {city}.",
            "mood": "happy"
        })

    except:

        return jsonify({
            "response": "I couldn't get the weather right now.",
            "mood": "concerned"
        })

def ping_google():

    try:

        result = subprocess.run(
            ["ping", "-n", "2", "google.com"],
            capture_output=True,
            text=True
        )

        output = result.stdout

        if "Average" in output:

            latency = output.split("Average =")[-1].strip()

            return random.choice([
    "Internet connection looks stable.",
    "Network looks healthy from here.",
    "Connectivity check passed.",
    "Everything appears online."
])
        else:
            return "I'm having trouble reaching Google."
    except:
        return "Something went wrong while checking your connection."



    try:

        cleaned = re.sub(r"[^0-9+\-*/(). ]", "", problem)

        result = eval(cleaned)

        return f"The answer is {result}"

    except:
        return "That math problem confused me."

def solve_math(problem):

    try:
        # Keep only safe math characters
        cleaned = re.sub(r"[^0-9+\-*/(). ]", "", problem)

        # Prevent empty input
        if not cleaned.strip():
            return "I couldn't find a math problem to solve."

        # Solve safely
        result = eval(cleaned, {"__builtins__": None}, {})

        return f"The answer is {result}"

    except ZeroDivisionError:
        return "Division by zero would tear a hole in reality."

    except:
        return "That math problem confused me."

#-----------------------------------------------------------------------------------
def get_response(message):

    message = message.lower().strip()

    if len(message) > 200:
        return (
        "That's a LOT of text. Try a shorter message",
        "concerned"
    )
    if not message.strip():
        return (
        "You didn't type anything. Am I having a stroke?",
        "confused"
    )


    # WEATHER
    if any(word in message for word in WEATHER_WORDS):
        return (
            "I can check local weather automatically now. "
            "Press the weather button or allow location access.",
            "happy"
        )

    # INTERNET / PING
    elif any(word in message for word in NETWORK_WORDS):

        response = ping_google()

        if "stable" in response:
            mood = "happy"
        else:
            mood = "concerned"

        return (response, mood)

    # MATH
    elif any(char.isdigit() for char in message):

        response = solve_math(message)
        return (response, "thinking")

    # GREETINGS
    elif any(word in message for word in GREETING_WORDS):

        return (
            random.choice([
                "Hey there 👋",
                "Hello, human.",
                "Systems online and ready.",
                "Pings standing by."
            ]),
            "happy"
        )

    # FALLBACK
    fallbacks = [

    "I understood approximately none of that",

    "My current specialties are weather, internet diagnostics, and questionable math skills.",

    "That topic is outside my training data... and emotional comfort zone.",

    "I'm still learning. Try weather, internet, or math.",

    "I ran that request through my processors and achieved confusion.",

    "I'm just a little network robot doing my best.",

    "That sounds important. Unfortunately, I have the intelligence of a smart toaster.",

    "I could pretend to know the answer, but that's how printers are born.",

    "My developer (Ali Rulez) forgot to install that feature.",

    "Interesting question. I'm going to ignore it professionally."

]
    return (
    random.choice(fallbacks),
    "confused"
)




if __name__ == "__main__":
    app.run(debug=False)
