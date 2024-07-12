import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent {
  @ViewChild('boletaModal') boletaModal: TemplateRef<any> | undefined;
  public modalRef: BsModalRef | undefined;
  public selectedBoleta: any;

  constructor(
    public apiService: ApiService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.apiService.getAllBoletas();
  }

  async openBoletaModal(boleta: any) {
    this.selectedBoleta = boleta;
    if (this.boletaModal) {
      this.modalRef = this.modalService.show(this.boletaModal, { class: 'modal-lg' });
    }
  }

}
