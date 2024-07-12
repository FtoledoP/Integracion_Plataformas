import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentaComponent } from './components/venta/venta.component';
import { ComprarComponent } from './components/comprar/comprar.component';
import { BoletasComponent } from './components/boletas/boletas.component';
import { GestionComponent } from './components/gestion/gestion.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/comprar',
    pathMatch: 'full'
  },
  {
    path: 'venta',
    component: VentaComponent,
  },
  {
    path: 'comprar',  
    component: ComprarComponent
  },
  {
    path: 'boletas',  
    component: BoletasComponent
  },
  {
    path: 'gestion',  
    component: GestionComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
