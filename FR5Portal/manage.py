#!/usr/bin/env python
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def main():
    data = {
        test: 123
    }
    return jsonify(data)
