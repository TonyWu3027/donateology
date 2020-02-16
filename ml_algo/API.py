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
    return jsonify([{'addr' : '0x5121C3e875f3E52c2C162CdDACe01C45E35D30E5', 'amt': Arr[0]},
                    {'addr' : '0xBA97d93B48a75b261AB6Ff09285be10a839736Df', 'amt': Arr[1]},
                    {'addr' :'0x0FC5617F53C80Aa30f94CdC1A438D75Eb803FF91', 'amt' :Arr[2]},
                    {'addr' :'0x8f07a384Ad81faf5b5163C853915a09c0f2B5ba1', 'amt' : Arr[3]},
                    {'addr' :'0x7c0722BA1A31ec985903EEb244afaD1f9dFb5210', 'amt' : Arr[4]}])


if __name__ == '__main__':
    app.run(port = 5000,debug=True)
