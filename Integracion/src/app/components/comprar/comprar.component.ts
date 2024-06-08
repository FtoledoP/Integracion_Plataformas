import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
export class ComprarComponent {
  @ViewChild('boletaCliente') boletaCliente: TemplateRef<any> | undefined;
  public ventaForm: FormGroup;
  selectedCliente:any;
  clientes:any
  selectedProducts:any[] = [];
  selectedMethod:any;
  selectedPayment:any;
  public modalRef: BsModalRef | undefined;
  dataSale:any

  constructor(
    private fb: FormBuilder,
    public apiService: ApiService,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
  ){
    this.ventaForm = this.fb.group({
      cliente: ['', Validators.required],
    });
  }

  ngOnInit(){
    this.apiService.getClientes();
    this.apiService.getProductos();
  }

  async guardarVenta(){
    const objEnviar = {
      id_cliente: this.ventaForm.value.cliente,
      productos: this.selectedProducts,
      metodo_envio: this.selectedMethod,
      metodo_pago: this.selectedPayment
    }
    this.dataSale = await this.apiService.generarBoleta(objEnviar)
    this.openBoletaModal();
  }

  saveSelectedProducts(id:any, event:any){
    event.target.checked ? this.selectedProducts.push({id: id})
    :
    this.removeProduct(id);
  }

  updateQuantity(id:any, event:any){
    const index = this.selectedProducts.findIndex((item:any) => item.id === id);
    if(index !== -1){
      this.selectedProducts[index].cantidad = parseInt(event.target.value);
    }
  }

  removeProduct(id: number) {
    const index = this.selectedProducts.findIndex((item: any) => item.id === id);
    console.log('INDEX ---->', index);
    if (index !== -1) {
      this.selectedProducts.splice(index, 1);
    }
  }

  getSelectedMethod(event:any){
    this.selectedMethod = event.target.value;
  }

  getSelectedPayment(event:any){
    this.selectedPayment = event.target.value;
  }

  openAskModal(template: any) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  
  openBoletaModal() {
    if (this.boletaCliente) {
      this.modalRef = this.modalService.show(this.boletaCliente, { class: 'modal-lg' });
    }
  }

}
