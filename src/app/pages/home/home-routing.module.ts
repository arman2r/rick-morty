import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallePersonajeComponent } from '../detalle-personaje/detalle-personaje.component';
import { PersonajesComponent } from '../personajes/personajes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'personajes',
    pathMatch: 'full',
  }, 
  {
    path: '',
    component: PersonajesComponent,
    children: [
      {
        path: 'personajes',
        component: PersonajesComponent, 
      } 
    ]
  },
  {
    path: 'personaje/:id',
    component: DetallePersonajeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
