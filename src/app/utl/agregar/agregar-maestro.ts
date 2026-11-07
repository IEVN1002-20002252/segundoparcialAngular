import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-agregar-maestro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './agregar-maestro.html'
})
export class AgregarMaestroComponent {
  maestro: any = {
    idmaestro: '',
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  registrarMaestro() {
    this.http.post('http://localhost:5000/api/maestros/', this.maestro)
      .subscribe({
        next: (response: any) => {
          alert(response.mensaje || 'Maestro registrado con éxito');
          this.router.navigate(['/utl/maestros']);
        },
        error: (err) => {
          console.error('Error al registrar:', err);
          alert(err.error?.mensaje || 'No se pudo registrar el maestro');
        }
      });
  }
}