import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-registro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-registro.html'
})
export class VerRegistroComponent implements OnInit {
  registrosCompras: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarRegistros();
  }

  cargarRegistros(): void {
    const datos = localStorage.getItem('registrosCinepolis');
    if (datos) {
      this.registrosCompras = JSON.parse(datos);
    }
  }

  eliminarRegistro(index: number): void {
    this.registrosCompras.splice(index, 1);
    localStorage.setItem('registrosCinepolis', JSON.stringify(this.registrosCompras));
  }

  // Método para editar: guarda el índice y datos para cargarlos en Cinépolis
  editarRegistro(index: number): void {
    const compraAEditar = this.registrosCompras[index];
    
    // Guardamos el objeto que vamos a editar y su índice
    localStorage.setItem('editandoCinepolis', JSON.stringify({ index, ...compraAEditar }));
    
    // Opcional: lo quitamos de los registros históricos mientras se edita, o lo dejamos. 
    // Lo redirigimos a la pantalla de Cinépolis:
    this.router.navigate(['/escuela/cinepolis']);
  }

  regresar(): void {
    this.router.navigate(['/escuela/cinepolis']);
  }
}