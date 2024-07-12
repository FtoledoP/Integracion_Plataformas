from flask import Flask, request
from flask_restful import Api, Resource
import requests
from flask_cors import CORS
import random

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

url_cliente = "https://integracionplataformasapi.azurewebsites.net/api/cliente"
url_producto = "https://integracionplataformasapi.azurewebsites.net/api/producto"

class Factura(Resource):
    facturas = []

    @staticmethod
    def generate_unique_id():
        unique_id = random.randint(1, 1000000)
        while unique_id in [factura["id_boleta"] for factura in Factura.facturas]:
            unique_id = random.randint(1, 1000000)
        return unique_id

    def get(self):
        return Factura.facturas

    def post(self):
        new_id = Factura.generate_unique_id()
        objRespuesta = {
            "productos": 0,
            "total_venta": 0,
            "cliente_id": 0,
        }

        json = request.get_json()
        cliente_response = requests.get(url_cliente + "/" + str(json["id_cliente"]))
        producto_ids = json["productos"]

        productos = []
        for producto_id in producto_ids:
            producto_response = requests.get(url_producto + "/" + str(producto_id["id"]))
            if producto_response.status_code == 200:
                producto_json = {
                    "nombre": producto_response.json()["nombre"],
                    "sku": producto_response.json()["sku"],
                    "precio": producto_response.json()["precio"],
                    "cantidad": producto_id["cantidad"]
                }
                productos.append(producto_json)

        if cliente_response.status_code == 200:
            cliente_json = cliente_response.json()

            for producto in productos:
                objRespuesta["total_venta"] += producto["precio"] * producto["cantidad"]
            if json["metodo_envio"] == "envio":
                objRespuesta["total_venta"] += 5000

            objRespuesta.update({
                "cliente_id": cliente_json["id"],
                "nombre_cliente": cliente_json["razonSocial"],
                "direccion_cliente": cliente_json["direccion"],
                "comuna_cliente": cliente_json["comuna"],
                "productos": productos,
                "metodo_envio": json["metodo_envio"],
                "metodo_pago": json["metodo_pago"],
                "estado": "pendiente",
                "id_boleta": new_id
            })

        Factura.facturas.append(objRespuesta)
        return objRespuesta

class FacturaPorId(Resource):
    def get(self, id_boleta):
        factura = next((factura for factura in Factura.facturas if factura["id_boleta"] == id_boleta), None)
        if factura:
            return factura
        else:
            return {"message": "Boleta no encontrada"}, 404

    def put(self, id_boleta):
        json = request.get_json()
        factura = next((factura for factura in Factura.facturas if factura["id_boleta"] == id_boleta), None)
        if not factura:
            return {"message": "Boleta no encontrada"}, 404

        if "productos" in json:
            factura["productos"] = json["productos"]
        if "total_venta" in json:
            factura["total_venta"] = json["total_venta"]
        if "cliente_id" in json:
            factura["cliente_id"] = json["cliente_id"]
        if "nombre_cliente" in json:
            factura["nombre_cliente"] = json["nombre_cliente"]
        if "direccion_cliente" in json:
            factura["direccion_cliente"] = json["direccion_cliente"]
        if "comuna_cliente" in json:
            factura["comuna_cliente"] = json["comuna_cliente"]
        if "metodo_envio" in json:
            factura["metodo_envio"] = json["metodo_envio"]
        if "metodo_pago" in json:
            factura["metodo_pago"] = json["metodo_pago"]
        if "estado" in json:
            factura["estado"] = json["estado"]

        return factura

class FacturaPorCliente(Resource):
    def get(self, id_cliente):
        facturas_cliente = [factura for factura in Factura.facturas if factura["cliente_id"] == id_cliente]
        if facturas_cliente:
            return facturas_cliente
        else:
            return {"message": "No se encontraron boletas para este cliente"}, 404

api.add_resource(Factura, "/api/boleta")
api.add_resource(FacturaPorId, "/api/boleta/<int:id_boleta>")
api.add_resource(FacturaPorCliente, "/api/boleta/cliente/<int:id_cliente>")

if __name__ == '__main__':
    app.run(debug=True, port=5001)