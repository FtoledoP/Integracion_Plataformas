from flask import Flask, request
from flask_restful import Api, Resource
import requests
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

url_cliente = "http://localhost:22435/api/cliente"
url_producto = "http://localhost:22435/api/producto"

## POST localhost:port/api/boleta 
## > body: json > { id_producto, cantidad, id_cliente }
## new Factura() -> #3ag32g45 --> Factura{ }
class Factura(Resource):
    def post(self):
        # definimos un objeto para la respuesta de la boleta
        objRespuesta = {
            "productos": 0,
            "total_venta": 0,
            "cliente_id": 0,
        }

        # capturamos el json que nos llega
        json = request.get_json()

        # generamos una nueva consulta hacia el api de cliente
        cliente_response = requests.get(url_cliente+"/"+ str(json["id_cliente"]))
        # generamos una nueva consulta hacia el api de producto por cada id
        producto_ids = json["productos"]
        print(producto_ids)
        productos = []
        for producto_id in producto_ids:
            producto_response = requests.get(url_producto + "/" + str(producto_id["id"]))
            if producto_response.status_code == 200:
                producto_json = {}
                producto_json["nombre"] = producto_response.json()["nombre"]
                producto_json["sku"] = producto_response.json()["sku"]
                producto_json["precio"] = producto_response.json()["precio"]
                producto_json["cantidad"] = producto_id["cantidad"]
                productos.append(producto_json)
        print(cliente_response.status_code)
        print(productos)
        if(cliente_response.status_code == 200):
            cliente_json = cliente_response.json()
            producto_json = producto_response.json()

            for producto in productos:
                objRespuesta["total_venta"] += producto["precio"] * producto["cantidad"]
            if(json["metodo_envio"] == "envio"):
                objRespuesta["total_venta"] += 5000
            objRespuesta["cliente_id"] = cliente_json["id"]
            objRespuesta["nombre_cliente"] = cliente_json["razonSocial"]
            objRespuesta["direccion_cliente"] = cliente_json["direccion"]
            objRespuesta["comuna_cliente"] = cliente_json["comuna"]
            objRespuesta["productos"] = productos
            objRespuesta["metodo_envio"] = json["metodo_envio"]
            objRespuesta["metodo_pago"] = json["metodo_pago"]
            

        return objRespuesta
    
api.add_resource(Factura, "/api/boleta")

app.run(debug=True, port=5001)