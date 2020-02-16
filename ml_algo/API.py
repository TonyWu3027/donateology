from flask import Flask
from flask import request,jsonify
from flask_cors import CORS
from rewrite import Hospital
app = Flask(__name__)
CORS(app)


@app.route("/",methods = ["GET"])
def callDemand():
    money = int(request.args.get('amt'))


    hos = Hospital()
    Arr = hos.getDistri(money)
    return jsonify({'hosp_1' : Arr[0],'hosp_2' : Arr[1],'hosp_3':Arr[2],'hosp_4' : Arr[3],'hosp_5' : Arr[4]})


if __name__ == '__main__':
    app.run(port = 5000,debug=True)
