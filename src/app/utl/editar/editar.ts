import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './editar.html'
})
export class EditarComponent implements OnInit {
  matricula: string = '';
  alumno: any = {
    matricula: '',
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Captura la matrícula de la URL
    this.matricula = this.route.snapshot.paramMap.get('matricula') || '';
    if (this.matricula) {
      this.cargarAlumno();
    }
  }

  // Carga los datos actuales del alumno desde Flask para mostrarlos en el formulario
  cargarAlumno() {
    this.http.get<any>(`http://localhost:5000/api/alumnos/${this.matricula}`)
      .subscribe({
        next: (response) => {
          if (response.exito) {
            this.alumno = response.alumno;
          }
        },
        error: (err) => {
          console.error('Error al cargar el alumno:', err);
        }
      });
  }

  // Envía los datos actualizados a Flask mediante PUT
  actualizarAlumno() {
    this.http.put(`http://localhost:5000/api/alumnos/${this.matricula}`, this.alumno)
      .subscribe({
        next: (response: any) => {
          alert(response.mensaje || 'Alumno actualizado correctamente');
          this.router.navigate(['/utl/alumnos']);
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('No se pudo actualizar el alumno');
        }
      });
  }
}