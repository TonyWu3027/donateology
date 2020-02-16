from flask import Flask
from flask import request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["POST"])
def handlePost():
    return jsonify(request.data)

# add leave game functionaltiies
app.run(port=5000, debug=1)
