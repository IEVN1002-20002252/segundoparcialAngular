import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'formulario/zodiaco',
    loadComponent: () => import('./zodiaco/zodiaco').then(m => m.ZodiacoComponent)
  },
  {
    path: 'formulario/usuarios',
    loadComponent: () => import('./formulario/usuario/usuario').then(m => m.UsuarioComponent)
  },
  {
    path: 'escuela/lista-alumnos',
    loadComponent: () => import('./escuela/lista_alumnos').then(m => m.ListaAlumnosComponent)
  },
  {
    path: 'escuela/cinepolis',
    loadComponent: () => import('./escuela/cinepolis/cinepolis').then(m => m.CinepolisComponent)
  },
  {
    path: '',
    redirectTo: 'formulario/zodiaco',
    pathMatch: 'full'
  }
];