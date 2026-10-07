import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Alumno {
  matricula: string;
  nombre: string;
  correo: string;
  materia: string;
}

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista_alumnos.html',
  styleUrl: './lista_alumnos.css'
})
export class ListaAlumnosComponent {
  nuevoAlumno: Alumno = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: ''
  };

  // Arreglo vacío listo para recibir datos
  alumnos: Alumno[] = [];

  agregarAlumno() {
    if (
      this.nuevoAlumno.matricula &&
      this.nuevoAlumno.nombre &&
      this.nuevoAlumno.correo &&
      this.nuevoAlumno.materia
    ) {
      this.alumnos.push({ ...this.nuevoAlumno });
      // Limpiar el formulario
      this.nuevoAlumno = { matricula: '', nombre: '', correo: '', materia: '' };
    }
  }
}