import { Component, ElementRef, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Flowbite } from '../decorador';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
@Flowbite()
export class ComprarComponent implements OnInit {
  @ViewChild('boletaCliente') boletaCliente: TemplateRef<any> | undefined;
  public ventaForm: FormGroup;
  selectedCliente: any;
  clientes: any;
  selectedProducts: any[] = [];
  selectedMethod: any;
  selectedPayment: any;
  public modalRef: BsModalRef | undefined;
  dataSale: any;
  loading: boolean = false;
  totalPrice: number = 0; // Precio total de todos los productos en el carrito

  constructor(
    private fb: FormBuilder,
    public apiService: ApiService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.ventaForm = this.fb.group({
      customer: ['', Validators.required],
      shipment: ['', Validators.required],
      payment: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.apiService.getClientes();
    this.apiService.getProductos();
    this.loadCart();
  }

  loadCart() {
    const storedProducts = localStorage.getItem('selectedProducts');
    if (storedProducts) {
      this.selectedProducts = JSON.parse(storedProducts);
      this.calculateTotals(); // Calcular los totales iniciales
    }
  }

  removeFromCart(product: any) {
    this.selectedProducts = this.selectedProducts.filter(p => p.sku !== product.sku);
    localStorage.setItem('selectedProducts', JSON.stringify(this.selectedProducts));
    this.calculateTotals();
  }

  addToCart(product: any) {
    const productExists = this.selectedProducts.some(p => p.sku === product.sku);
    if (productExists) {
      this.toastr.error('Este producto ya está en el carrito');
    } else {
      product.cantidad = 1;
      product.precioTotal = product.precio;
      this.selectedProducts.push(product);
      localStorage.setItem('selectedProducts', JSON.stringify(this.selectedProducts));
      this.toastr.success('Se ha agregado ' + product.nombre + ' al carrito', 'Exito');
      this.calculateTotals();
    }
  }

  guardarVenta() {
    this.modalRef?.hide();
    const objEnviar = {
      id_cliente: this.ventaForm.value.cliente,
      productos: this.selectedProducts,
      metodo_envio: this.selectedMethod,
      metodo_pago: this.selectedPayment
    };
    console.log('OBJ ENVIAR ---->', objEnviar);
    this.apiService.generarBoleta(objEnviar).then(data => {
      this.dataSale = data;
      console.log('DATA SALE ---->', this.dataSale);
      this.openBoletaModal();
    });
  }

  getSelectedMethod(event: any) {
    this.selectedMethod = event.target.value;
  }

  getSelectedPayment(event: any) {
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
        this.guardarVenta();
      }, 2000);
    }, 3500);
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  openBoletaModal() {
    if (this.boletaCliente) {
      this.modalRef = this.modalService.show(this.boletaCliente, { class: 'modal-lg' });
    }
  }

  // Aumentar la cantidad del producto en el carrito
  increaseQuantity(item: any) {
    if(item.cantidad >= item.stock) return;
    item.cantidad++;
    item.precioTotal = item.precio * item.cantidad; // Actualizar el precio total
    this.calculateTotals();
  }

// Disminuir la cantidad del producto en el carrito
  decreaseQuantity(item: any) {
    if (item.cantidad > 1) {
        item.cantidad--;
        item.precioTotal = item.precio * item.cantidad; // Actualizar el precio total
        this.calculateTotals();
    }
  }

// Actualizar el almacenamiento local con los productos modificados
  updateLocalStorage() {
    localStorage.setItem('selectedProducts', JSON.stringify(this.selectedProducts));
    localStorage.setItem('totalPrice', this.totalPrice.toString())
  }

  calculateTotals() {
    this.totalPrice = this.selectedProducts.reduce((total, item) => total + (item.precioTotal), 0);
    this.updateLocalStorage(); // Actualizar el almacenamiento local después de calcular
  }

  comprar(){
    console.log(this.ventaForm.value)
  }

}
