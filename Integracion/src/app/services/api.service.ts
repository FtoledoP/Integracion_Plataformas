import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public listaClientes: any[] = [];
  public listaProductos: any[] = [];

  constructor() {
    this.getClientes();
    this.getProductos();
  }

  async getClientes() {
    await fetch("http://localhost:22435/api/cliente", {
      headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
      },
      mode: 'cors'
    }).then(async(response) => {
      response.json().then((data) => {
        console.log(data);
        this.listaClientes = data;
      })
    })
  }

  async getProductos() {
    await fetch("http://localhost:22435/api/producto", {
      headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
      },
      mode: 'cors'
    }).then(async(response) => {
      response.json().then((data) => {
        console.log(data);
        this.listaProductos = data;
      })
    })
  }

  async generarBoleta(data:any){
    fetch("http://localhost:5001/api/boleta", {
      headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
      },
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(data)
  }).then(async function(e){
      await e.json().then((obj) => { console.log({obj}) });
  }).catch(function(error){ alert(error.message) })
  .finally(function(){
      alert("Completado");
      /*
      JSON.parse("{ 'id': 5, 'name': 'oli' }");
      {
          "id": 5,
          "name": "oli"
      }
      */
  });
  }

}
