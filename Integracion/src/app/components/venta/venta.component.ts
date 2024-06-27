import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent {
  public saveClienteFormGroup: FormGroup;
  public saveProductoFormGroup: FormGroup;
  public modalRef: BsModalRef | undefined;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {
    this.saveClienteFormGroup = this.fb.group({
      id: ['', Validators.required],
      razonSocial: ['', Validators.required],
      rut: ['', Validators.compose([Validators.required])],
      direccion: ['', Validators.required],
      comuna: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
    });
    this.saveProductoFormGroup = this.fb.group({
      sku: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      stock: ['', Validators.required],
      precio: ['', Validators.required],
    });
  } 

  openRutModal(template: any) {
    this.saveClienteFormGroup.patchValue({
      rut: '',
      password: '',
    });
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  guardarCliente(){
    console.log(this.saveClienteFormGroup.value);
    this.apiService.addCliente(this.saveClienteFormGroup.value);
    this.toastr.success('Cliente guardado con exito!');
    this.saveClienteFormGroup.reset();
    this.modalRef?.hide();
  }

  guardarProducto(){
    console.log(this.saveProductoFormGroup.value);
    this.apiService.addProducto(this.saveProductoFormGroup.value);
    this.toastr.success('Producto guardado con exito!');
    this.saveProductoFormGroup.reset();
    this.modalRef?.hide();
  }

}
