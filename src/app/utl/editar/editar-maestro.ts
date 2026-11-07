import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-editar-maestro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './editar-maestro.html'
})
export class EditarMaestroComponent implements OnInit {
  idmaestro: string = '';
  maestro: any = {
    idmaestro: '',
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
    this.idmaestro = this.route.snapshot.paramMap.get('id') || '';
    if (this.idmaestro) {
      this.cargarMaestro();
    }
  }

  cargarMaestro() {
    this.http.get<any>(`http://localhost:5000/api/maestros/${this.idmaestro}`)
      .subscribe({
        next: (response) => {
          if (response.exito) {
            this.maestro = response.maestro;
          }
        },
        error: (err) => console.error('Error al cargar el maestro:', err)
      });
  }

  actualizarMaestro() {
    this.http.put(`http://localhost:5000/api/maestros/${this.idmaestro}`, this.maestro)
      .subscribe({
        next: (response: any) => {
          alert(response.mensaje || 'Maestro actualizado correctamente');
          this.router.navigate(['/utl/maestros']);
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('No se pudo actualizar el maestro');
        }
      });
  }
}