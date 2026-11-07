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
    path: 'escuela/ver-registro',
    loadComponent: () => import('./escuela/ver-registro/ver-registro').then(m => m.VerRegistroComponent)
  },
  // --- RUTAS DE ALUMNOS ---
  {
    path: 'utl/alumnos',
    loadComponent: () => import('./utl/alumnos/alumnos').then(m => m.Alumnos)
  },
  {
    path: 'utl/agregar',
    loadComponent: () => import('./utl/agregar/agregar').then(m => m.AgregarComponent)
  },
  {
    path: 'utl/editar/:matricula',
    loadComponent: () => import('./utl/editar/editar').then(m => m.EditarComponent)
  },
  // --- RUTAS DE MAESTROS ---
  {
    path: 'utl/maestros',
    loadComponent: () => import('./utl/maestros/maestros').then(m => m.Maestros)
  },
  {
    path: 'utl/agregar-maestro',
    loadComponent: () => import('./utl/agregar/agregar-maestro').then(m => m.AgregarMaestroComponent)
  },
  {
    path: 'utl/editar-maestro/:id',
    loadComponent: () => import('./utl/editar/editar-maestro').then(m => m.EditarMaestroComponent)
  },
  {
    path: '',
    redirectTo: 'formulario/zodiaco',
    pathMatch: 'full'
  }
];