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
  loading:boolean = false;

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
    this.modalRef?.hide();
    const objEnviar = {
      id_cliente: this.ventaForm.value.cliente,
      productos: this.selectedProducts,
      metodo_envio: this.selectedMethod,
      metodo_pago: this.selectedPayment
    }
    console.log('OBJ ENVIAR ---->', objEnviar);
    this.dataSale = await this.apiService.generarBoleta(objEnviar)
    console.log('DATA SALE ---->', this.dataSale);
    this.openBoletaModal();
  }

  toggleProductSelection(id: any, event: any) {
    if (event.target.checked) {
      this.selectedProducts.push({ id: id, cantidad: 0 });
    } else {
      this.removeProduct(id);
      this.resetQuantityInput(id);
    }
  }

  updateQuantity(id: any, event: any) {
    const index = this.selectedProducts.findIndex(item => item.id === id);
    if (index !== -1) {
      this.selectedProducts[index].cantidad = parseInt(event.target.value);
    }
  }

  removeProduct(id: number) {
    const index = this.selectedProducts.findIndex(item => item.id === id);
    if (index !== -1) {
      this.selectedProducts.splice(index, 1);
    }
  }

  resetQuantityInput(id: number) {
    const inputElement = document.getElementById('cantidad_' + id) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  }

  isProductSelected(id: any): boolean {
    return this.selectedProducts.some(item => item.id === id);
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

  openPaymentModal(template: any) {
    this.modalRef?.hide();
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      setTimeout(() => {
        this.guardarVenta()
      }, 2000);
    }, 3500);
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  
  openBoletaModal() {
    if (this.boletaCliente) {
      this.modalRef = this.modalService.show(this.boletaCliente, { class: 'modal-lg' });
    }
  }

}
