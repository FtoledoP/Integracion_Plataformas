import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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
    private modalService: BsModalService
  ) {
    this.apiService.getClientes();
  }

  async openBoletaModal(event: any) {
    this.selectedBoleta = await this.apiService.getBoletaById(event.target.value);
    if (this.boletaModal) {
      this.modalRef = this.modalService.show(this.boletaModal, { class: 'modal-lg' });
    }
  }

  confirmarEntrega() {
    // Aquí puedes realizar alguna acción para confirmar la entrega de la boleta
    console.log('Entrega confirmada para la boleta:', this.selectedBoleta.id_boleta);
    this.modalRef?.hide();
  }
}
