import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lista_alumnos.html',
  styleUrl: './lista_alumnos.css'
})
export class ListaAlumnosComponent implements OnInit {
  formulario!: FormGroup;
  alumnos: any[] = [];
  indiceEdicion: number = -1;

  nuevoAlumno = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: ''
  };

  ngOnInit(): void {
    this.cargarAlumnos();
    this.formulario = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl('')
    });
  }

  agregarAlumno(): void {
    // Sincronizamos los valores del formulario con el objeto nuevoAlumno antes de validar
    this.nuevoAlumno = this.formulario.value;

    if (
      this.nuevoAlumno.matricula === '' ||
      this.nuevoAlumno.nombre === '' ||
      this.nuevoAlumno.correo === '' ||
      this.nuevoAlumno.materia === ''
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (this.indiceEdicion !== -1) {
      this.alumnos[this.indiceEdicion] = {
        ...this.nuevoAlumno
      };
      this.indiceEdicion = -1;
    } else {
      this.alumnos.push({ ...this.nuevoAlumno });
    }

    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    );

    this.limpiarCampos();
  }

  cargarAlumnos(): void {
    const datos = localStorage.getItem('alumnos');
    if (datos) {
      this.alumnos = JSON.parse(datos);
    }
  }

  editarAlumnos(index: number): void {
    this.nuevoAlumno = {
      ...this.alumnos[index]
    };
    const alumno = this.alumnos[index];
    this.formulario.patchValue({
      matricula: alumno.matricula,
      nombre: alumno.nombre,
      correo: alumno.correo,
      materia: alumno.materia
    });
    this.indiceEdicion = index;
  }

  // Método exacto de eliminar alumno 
  eliminarAlumno(index: number): void {
    this.alumnos.splice(index, 1);
    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    );
  }

  limpiarCampos(): void {
    this.nuevoAlumno = {
      matricula: '',
      nombre: '',
      correo: '',
      materia: ''
    };
    this.formulario.reset();
    this.indiceEdicion = -1;
  }
}