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
    "temp",
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

def solve_math(problem):
    problem = problem.replace("x", "*")
    try:
        # Convert x into multiplication
        problem = problem.lower().replace("x", "*")

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

def local_weather(location):

    url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?q={location}&appid={API_KEY}&units=imperial"
    )

    try:
        res = requests.get(url).json()

        city = res["name"]
        temp = round(res["main"]["temp"])
        desc = res["weather"][0]["description"]

        return f"It's currently {temp}°F with {desc} in {city}."

    except:
        return "I couldn't get the weather right now."

def ping_google():
    try:
        requests.get("https://google.com", timeout=5)
        return "Internet connection looks stable."
    except Exception as e:
        return f"Internet check failed: {e}"
#-----------------------------------------------------------------------------------
def get_response(message):
    words = message.lower().strip()
    
    # GREETINGS
    if any(words in GREETING_WORDS for word in words):
        return ("Hello, human.", "happy")

    # WEATHER
    if any(words in WEATHER_WORDS for word in words):
        if "in " in message:
            location = message.split("in ", 1)[1].strip()
        else:
            location = "Bend"

        response = local_weather(location)
        return (response, "happy")

    # NETWORK
    if any(words in NETWORK_WORDS for word in words):
        response = ping_google()
        if "stable" in response:
            mood = "happy"
        else:
            mood = "concerned"

        return (response, mood)

    # MATH
    if any(char.isdigit() for char in message) or any(
    op in message for op in ["+", "-", "*", "/", "x"]
):
        response = solve_math(message)

        return (response, "thinking")

    # FALLBACK
    return (
        "I am a tiny robot and that confused me.",
        "confused"
    )

if __name__ == "__main__":
    app.run(debug=False)
