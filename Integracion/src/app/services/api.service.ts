import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public listaClientes: any[] = [];
  public listaProductos: any[] = [];
  listo:boolean = false;

  constructor() {
    this.getClientes();
    this.getProductos();
  }

  async getClientes() {
    await fetch('http://localhost:22435/api/cliente', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
    }).then(async (response) => {
      response.json().then((data) => {
        this.listaClientes = data;
      });
    });
  }

  async getProductos() {
    await fetch('http://localhost:22435/api/producto', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
    }).then(async (response) => {
      response.json().then((data) => {
        this.listaProductos = data;
      });
    });
  }

  async generarBoleta(data: any) {
    try {
      this.listo = false;
      const response = await fetch('http://localhost:5001/api/boleta', {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
      });
      const obj = await response.json();
      this.listo = true;
      return obj;
    } catch (error:any) {
      alert(error.message);
    }
  }

  async addCliente(data: any) {
    console.log(JSON.stringify(data));
    fetch('http://localhost:22435/api/cliente', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(data),
    }).then(async function (e) {
      await e.json().then((obj) => {
        console.log({ obj });
      });
    });
  }

  async addProducto(data: any) {
    fetch('http://localhost:22435/api/producto', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(data),
    }).then(async function (e) {
      await e.json().then((obj) => {
        console.log({ obj });
      });
    });
  }
}