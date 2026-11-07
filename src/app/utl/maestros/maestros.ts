import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-maestros',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, HttpClientModule],
  templateUrl: './maestros.html',
  styleUrl: './maestros.css'
})
export class Maestros implements OnInit {
  listFilter: string = '';
  dataSource: any = [];      // Lista que se muestra en la tabla
  maestrosList: any = [];    // Copia completa original de la API

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarMaestros();
  }

  cargarMaestros() {
    this.http.get<any>('http://localhost:5000/api/maestros/').subscribe({
      next: (response: any) => {
        const datos = response.maestros || response;
        this.maestrosList = datos;
        this.dataSource = datos;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar la lista de maestros:', err);
      }
    });
  }

  // Método que filtra la tabla en tiempo real al escribir
  filtrarMaestros() {
    const filtro = this.listFilter.toLowerCase().trim();
    if (!filtro) {
      this.dataSource = [...this.maestrosList];
    } else {
      this.dataSource = this.maestrosList.filter((m: any) => 
        (m.nombre && m.nombre.toLowerCase().includes(filtro)) ||
        (m.apaterno && m.apaterno.toLowerCase().includes(filtro)) ||
        (m.amaterno && m.amaterno.toLowerCase().includes(filtro)) ||
        (m.correo && m.correo.toLowerCase().includes(filtro))
      );
    }
  }

  eliminarMaestro(idmaestro: string) {
    if (confirm(`¿Estás seguro de eliminar al maestro con ID ${idmaestro}?`)) {
      this.http.delete(`http://localhost:5000/api/maestros/${idmaestro}`).subscribe({
        next: (response: any) => {
          alert(response.mensaje || 'Maestro eliminado con éxito');
          this.cargarMaestros();
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('No se pudo eliminar el maestro');
        }
      });
    }
  }
}