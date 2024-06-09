import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VentaComponent } from './components/venta/venta.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ComprarComponent } from './components/comprar/comprar.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BoletasComponent } from './components/boletas/boletas.component';


@NgModule({
  declarations: [
    AppComponent,
    VentaComponent,
    ComprarComponent,
    BoletasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    NgSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [
    BsModalService,
    BsModalRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
