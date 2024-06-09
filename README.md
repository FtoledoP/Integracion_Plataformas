# ENTREGA: Codigo integracion 3 Apis + Mini Front

### Integrantes
- Donkan Alvarez
- Franco Toledo

#### Versions
- NodeJS: v18>
- Angular/CLI: v16

#### Contenido
- Api-csharp: API Cliente y API Productos
- Api-flask: API Factura y API Logistica
- Front con Angular para probar las funcionalidades de las APIS

## Uso

1. Inicializar las APIS en C#

2. Dentro de la carpeta api-flask en CMD ingresar:
   - `pip install flask`
   - `pip install -r requirements.txt`
   - `python apifactura.py`
   - `python apilogistica`

4. Dentro de la carpeta integracion en la terminal:
   - `npm install @angular/cli@16`
   - `npm install`
   - `ng serve`
  
5. Ahora se puede utilizar el Front 🤠

## Informacion adicional
La pagina inicial es para hacer una `Venta` seleccionando los campos que aparecen
En la esquina inferior derecha hay dos botones, uno para `agregar Productos y/o Clientes`, para facilitar ese proceso y otro para ver las `Boletas emitidas` (Al hacer una compra)
En la pagina de `Boletas emitidas` se mostraran todas las boletas por cada usuario que las haya emitida, al seleccionar una se abre un modal, en el cual si la boleta no esta confirmada aparecera un boton, y si esta confirmado no.
Al momento de confirmar una `Boleta`, se actualizara el estado de tal boleta (Se puede apreciar en la misma vista de la boleta) y se actualizara el stock de los productos relacionados a la boleta (Apreciable al volver a la pagina de `Venta`)
