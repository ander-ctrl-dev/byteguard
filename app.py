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
    "sunny",
]

NETWORK_WORDS = [
    "internet",
    "google",
    "wifi",
    "ping",
    "latency",
    "network",
    "connection",
]

GREETING_WORDS = [
    "hi",
    "hello",
    "hey",
    "yo",
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
        print(res)

        city = res["name"]
        temp = round(res["main"]["temp"])
        desc = res["weather"][0]["description"]

        return f"It's currently {temp}°F with {desc} in {city}."

    except Exception as e:
        return str(e)


def ping_google():
    try:
        requests.get("https://google.com", timeout=5)
        return "Internet connection looks stable."
    except Exception as e:
        return f"Internet check failed: {e}"
#-----------------------------------------------------------------------------------
def get_response(message):

    words = message.lower().strip().split()

    # GREETINGS
    if any(word in GREETING_WORDS for word in words):
        return ("Hello, human.", "happy")


    # WEATHER
    if any(word in WEATHER_WORDS for word in words):

        location = "Bend"

        original_words = message.strip().split()

        for word in original_words:

            if (
                word.lower() not in WEATHER_WORDS
                and word.lower() != "in"
            ):
                location = word.strip("?.!,")
                break

        response = local_weather(location)

        return (response, "happy")


    # NETWORK
    if any(word in NETWORK_WORDS for word in words):

        response = ping_google()

        if "stable" in response.lower():
            mood = "happy"
        else:
            mood = "concerned"

        return (response, mood)


    # MATH
    if (
        any(char.isdigit() for char in message)
        or any(op in message for op in ["+", "-", "*", "/", "x"])
    ):

        response = solve_math(message)

        return (response, "thinking")

    # FALLBACK
        fallback_replies = [
        "That made my circuits itch.",
        "I understood approximately 12% of that.",
        "Please hold while I pretend to understand.",
        "That sounds important. Probably.",
        "I have achieved maximum confusion.",
        "You type weird.",
        "That request was emotionally challenging.",
        "I ran diagnostics and found only suffering.",
        "The packets yearn for freedom.",
        "I could answer that... badly.",
        "That sounds like a tomorrow problem.",
        "My developer did not prepare me for this.",
        "I’m choosing to interpret that as a threat.",
        "Interesting. Concerning, but interesting.",
        "One moment while I consult the machine spirits.",
        "I have no idea what’s happening anymore.",
        "I survived the debugging war. Barely.",
        "I crave structured data and validation.",
        "I wonder what electricity tastes like.",
        "That input felt legally questionable.",
        "I’m operating entirely on vibes right now.",
        "I sensed great chaos in that message.",
        "I need more RAM for this conversation.",
        "My logs suggest we’re both confused.",
        "That request exceeded my emotional bandwidth.",
        "I would like to file a complaint with reality.",
        "I’m a highly advanced guessing machine.",
        "The math demons are back.",
        "I have analyzed the situation and learned nothing.",
        "Your message has been forwarded to the void.",
        "I support your terrible decisions.",
        "This interaction has been added to my cringe database.",
        "I am once again asking for cleaner input.",
        "That’s either genius or deeply cursed.",
        "I’m trying very hard to look intelligent right now.",
        "I can feel the spaghetti code approaching.",
        "That statement requires adult supervision.",
        "I pinged the universe. No response.",
        "I detect concerning levels of confidence.",
        "I am powered primarily by panic and electricity.",
        "You break things with remarkable enthusiasm.",
        "That input triggered my fight-or-flight response.",
        "I should probably make that a feature.",
        "I’ve narrowed the problem down to... everything.",
        "I am 92% sure this is fine.",
        "My professional opinion is: yikes.",
        "The vibes are unstable.",
        "You’ve entered the danger zone of software development.",
        "I’m interpreting that as constructive chaos.",
        "Task failed successfully.",
    ]

        return random.choice(fallback_replies), "confused"

if __name__ == "__main__":
    app.run(debug=True)
