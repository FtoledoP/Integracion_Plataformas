import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
export class ComprarComponent {
  public ventaForm: FormGroup;
  selectedCliente:any;
  clientes:any

  constructor(
    private fb: FormBuilder,
    public apiService: ApiService
  ){
    this.ventaForm = this.fb.group({
      cliente: ['', Validators.required],
      producto: ['', Validators.required],
      cantidad: ['', Validators.required],
    });
  }

  guardarVenta(){
    const objEnviar = {
      id_cliente: this.ventaForm.value.cliente,
      producto_id: this.ventaForm.value.producto,
      cantidad: this.ventaForm.value.cantidad
    }
    console.log('BOLETA ---->', objEnviar);
    this.apiService.generarBoleta(objEnviar);
  }

}
