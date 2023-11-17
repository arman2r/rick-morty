import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'personajes',
    pathMatch: 'full'
  },
  {
    path: 'personajes',
    loadComponent: () =>
      import('./pages/personajes/personajes.component').then((x) => x.PersonajesComponent),
  },
  {
    path: './:personaje',
    loadComponent: () =>
      import('./pages/detalle-personaje/detalle-personaje.component').then((x) => x.DetallePersonajeComponent),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
