import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProyectoapiService } from '../proyectoapi.service';
import { AlumnoFilterPipe } from '../alumnos.filter.pipe';
import { CommonModule } from '@angular/common';
import { AlumnosUtl } from '../alumnos';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [FormsModule, RouterLink, AlumnoFilterPipe, CommonModule],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.css'
})
export class Alumnos implements OnInit {

  imagewidth: number = 50;
  imageMargin: number = 2;
  muestraImg: boolean = true;
  listFilter: string = '';
  alumnoTitle!: string;

  dataSource: any = [];
  alumnosIric: AlumnosUtl[] = [];

  constructor(public alumnosUtl: ProyectoapiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    this.alumnosUtl.getAlumnos().subscribe({
      next: (response: any) => {
        const datos = response.alumnos || response;
        this.dataSource = datos;
        this.alumnosIric = datos;
        this.cdr.detectChanges(); // Fuerza la actualización visual de la tabla
      },
      error: (err) => {
        console.error('Error al cargar la lista de alumnos:', err);
      }
    });
  }

  eliminarAlumno(matricula: any) {
    if (confirm(`¿Estás seguro de eliminar al alumno con matrícula ${matricula}?`)) {
      this.alumnosUtl.deleteAlumno(Number(matricula)).subscribe({
        next: (response: any) => {
          alert(response.mensaje || 'Alumno eliminado con éxito');
          this.cargarAlumnos(); // Refresca la tabla después de eliminar
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('No se pudo eliminar el alumno');
        }
      });
    }
  }
}