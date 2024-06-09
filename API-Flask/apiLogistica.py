from flask import Flask, request
from flask_restful import Api, Resource
import requests
from flask_cors import CORS
import random

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

url_cliente = "http://localhost:22435/api/cliente"
url_producto = "http://localhost:22435/api/producto"
url_boleta = "http://localhost:5001/api/boleta"

class Logistica(Resource):

    def post(self):

        json = request.get_json()

        for producto in json["productos"]:
            producto_response = requests.get(url_producto + "/" + str(producto["sku"]))
            if producto_response.status_code == 200:
                producto_json = {
                    "nombre": producto_response.json()["nombre"],
                    "sku": producto_response.json()["sku"],
                    "precio": producto_response.json()["precio"],
                    "descripcion": producto_response.json()["descripcion"],
                    "stock": producto_response.json()["stock"] - producto["cantidad"]
                }
                requests.put(url_producto + "/" + str(producto["sku"]), json=producto_json)

        if json["metodo_envio"] == "envio":
            json_putEnvio ={
                "estado": "Recibido por cliente en domicilio"
            }
            requests.put(url_boleta + "/" + str(json["id_boleta"]), json=json_putEnvio)

        if json["metodo_envio"] == "retiro":
            json_putRetiro ={
                "estado": "Retirado por cliente en tienda"
            }
            requests.put(url_boleta + "/" + str(json["id_boleta"]), json=json_putRetiro)

        return json

api.add_resource(Logistica, "/api/logistica")

if __name__ == "__main__":
    app.run(debug=True, port=5002)
