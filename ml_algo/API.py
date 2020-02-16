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
    return jsonify({'0x5121C3e875f3E52c2C162CdDACe01C45E35D30E5' : Arr[0],'0xBA97d93B48a75b261AB6Ff09285be10a839736Df' : Arr[1],'0x0FC5617F53C80Aa30f94CdC1A438D75Eb803FF91':Arr[2],'0x8f07a384Ad81faf5b5163C853915a09c0f2B5ba1' : Arr[3],'0x7c0722BA1A31ec985903EEb244afaD1f9dFb5210' : Arr[4]})


if __name__ == '__main__':
    app.run(port = 5000,debug=True)
