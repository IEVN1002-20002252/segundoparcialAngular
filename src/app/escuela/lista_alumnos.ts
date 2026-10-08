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

  nuevoAlumno = {
    matricula: 'xx',
    nombre: 'xx',
    correo: 'xx',
    materia: 'xx'
  };

  ngOnInit(): void {
    this.formulario = new FormGroup({
      matricula: new FormControl('xx'),
      nombre: new FormControl('xx'),
      correo: new FormControl('xx'),
      materia: new FormControl('xx')
    });
  }

  agregarAlumno() {
    if (this.formulario.valid) {
      this.nuevoAlumno = this.formulario.value;
    }
  }
}