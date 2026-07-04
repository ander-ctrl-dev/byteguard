from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

@app.get("/")
def home():
    return render_template("index.html")

@app.post("/think")
def think():

    message = request.json.get("message", "")

    response = requests.post(
        "http://localhost:5001/chat",
        json={
            "message": message
        }
    )

    response.raise_for_status()

    return jsonify(response.json())


if __name__ == "__main__":
    app.run(debug=True)
