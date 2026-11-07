import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../proyectoapi.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './agregar.html'
})
export class AgregarComponent {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ProyectoapiService,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      matricula: [''],
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      // Cambiamos 'addAlumno' por 'agregarAlumno' que es como se llama en tu servicio
      this.apiService.agregarAlumno(this.formGroup.value).subscribe({
        next: (response: any) => {
          alert(response.mensaje || 'Alumno agregado correctamente');
          this.router.navigate(['/utl/alumnos']);
        },
        error: (err: any) => {
          console.error('Error al agregar alumno:', err);
          alert('No se pudo registrar el alumno');
        }
      });
    }
  }
}