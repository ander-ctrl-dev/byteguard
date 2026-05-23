from flask import Flask, render_template, request, jsonify
import random, socket, subprocess, requests, re
from dotenv import load_dotenv
import os
from math import sqrt

load_dotenv()
API_KEY = os.getenv("API_KEY")
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/think", methods=["POST"])
def think():
    data = request.get_json()

    message = data["message"]

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
    "wifi",
    "wi-fi",
    "internet",
    "network",
    "connection",
    "router",
    "modem",
    "ping",
    "icmp",
    "packet",
    "packets",
    "latency",
    "lag",
    "dns",
    "ethernet",
    "timeout",
    "disconnect",
    "signal",
    "bandwidth",
    "slow",
    "upload",
    "download",
    "isp",
]

GREETING_WORDS = [
    "hi",
    "hello",
    "hey",
    "yo",
]

def solve_math(problem):

    NUMBER_WORDS = {
        "zero": "0",
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9",
        "ten": "10",
        "hundred": "100",
        "thousand": "1000",
        "million": "1000000"
    }

    # convert number words
    for word, number in NUMBER_WORDS.items():
        problem = problem.replace(word, number)

    # operator phrases
    problem = problem.replace("plus", "+")
    problem = problem.replace("minus", "-")
    problem = problem.replace("times", "*")
    problem = problem.replace("multiplied by", "*")
    problem = problem.replace("divided by", "/")

    # powers
    problem = problem.replace("to the power of", "**")

    # square roots
    problem = problem.replace("square root of", "sqrt")

    # percentages
    problem = problem.replace("percent of", "*0.01*")

    # cleanup
    problem = problem.replace("what is", "")
    problem = problem.replace("calculate", "")
    problem = problem.strip()

    try:
        problem = re.sub(r"[^\d\+\-\*\/\.\(\)\s]", "", problem)
        result = eval(problem)
        return f"The answer is {result}"

    except Exception:
        return "The math demons are back."

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
        return ("The weather satellites are refusing to help me after what I did on Tuesday in Atlantic City")

def ping_google():
    try:
        requests.get("https://google.com", timeout=5)
        return "Internet connection looks stable."
    except Exception as e:
        return f"Internet check failed: {e}"
#-----------------------------------------------------------------------------------
def get_response(message):

    message = message.lower()
    cleaned = re.sub(r"[^\w\s-]", "", message)
    words = cleaned.split()


    # GREETING
    if any(word in GREETING_WORDS for word in words):
        return ("Hello, human.", "happy")

    # WEATHER
    elif (
        "weather" in words
        or "forecast" in words
        or "temp" in words
    ):

        response = local_weather("Prineville")

        return (response, "happy")

    # NETWORK
    elif any(
        trigger in message
        for trigger in [
            "wifi",
            "wi-fi",
            "internet",
            "network",
            "slow",
            "ping",
            "latency",
            "connection"
        ]
    ):

        network_replies = [
            "Your Wi-Fi may be congested or far from the router.",
            "Packet loss detected in the vibes department.",
            "Try restarting the router. Humanity fears this technique.",
            "Signal strength appears emotionally unstable.",
            "A slow connection can happen from interference or ISP issues."
        ]

        response = random.choice(network_replies)

        return (response, "concerned")

    # IP
    elif "ip" in words or "address" in words:

        response = (
            "An IP address is like a home address for devices on a network. "
            "It tells data where to go."
        )

        return (response, "thinking")

    # DIAGNOSTICS
    elif "diagnose" in words:

        response = (
            "Connection issues are commonly caused by DNS failures, "
            "weak Wi-Fi, or router instability."
        )

        return (response, "concerned")

    # MATH
    elif (
    re.search(r"\d", message)
    or any(
        word in message
        for word in [
            "plus",
            "minus",
            "times",
            "multiplied",
            "divided",
            "square root",
            "power",
            "percent"
        ]
    )
):
        response = solve_math(message)

        return (response, "thinking")


    # FALLBACK
    else:

        fallback_replies = [
            "That made my circuits itch.",
            "I understood approximately 12 percent of that.",
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
            "I am 92 percent sure this is fine.",
            "My professional opinion is: yikes.",
            "The vibes are unstable.",
            "You’ve entered the danger zone of software development.",
            "I’m interpreting that as constructive chaos.",
            "Task failed successfully.",
        ]

        response = random.choice(fallback_replies)

        return (response, "confused")


    return (random.choice(fallback_replies), "confused")

if __name__ == "__main__":
    app.run(debug=True)
