import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentaComponent } from './components/venta/venta.component';
import { ComprarComponent } from './components/comprar/comprar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/venta',
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
