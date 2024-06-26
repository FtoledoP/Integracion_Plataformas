import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-boletas',
  templateUrl: './boletas.component.html',
  styleUrls: ['./boletas.component.scss']
})
export class BoletasComponent {
  @ViewChild('boletaModal') boletaModal: TemplateRef<any> | undefined;
  public modalRef: BsModalRef | undefined;
  public selectedBoleta: any;

  constructor(
    public apiService: ApiService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.apiService.getClientes();
  }

  async openBoletaModal(event: any) {
    this.selectedBoleta = await this.apiService.getBoletaById(event.target.value);
    if (this.boletaModal) {
      this.modalRef = this.modalService.show(this.boletaModal, { class: 'modal-lg' });
    }
  }

  async confirmarEntrega() {
    console.log('Entrega confirmada para la boleta:', this.selectedBoleta.id_boleta);
    this.spinner.show();
    this.modalRef?.hide();
    await this.apiService.confirmDelivery(this.selectedBoleta).then(async() => {
      this.toastr.success('Se ha confirmado correctamente', 'Exito', {
        timeOut: 3000,
      });
      this.selectedBoleta = await this.apiService.getBoletaById(this.selectedBoleta.id_boleta);
      if (this.boletaModal) {
        this.modalRef = this.modalService.show(this.boletaModal, { class: 'modal-lg' });
      }
      this.spinner.hide();
    })
  }
}
