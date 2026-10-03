import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './zodiaco.html',
  styleUrl: './zodiaco.css'
})
export class ZodiacoComponent {
  // 1. Variables del Formulario
  nombre: string = '';
  apaterno: string = '';
  amaterno: string = '';
  dia: number | null = null;
  mes: number | null = null;
  anio: number | null = null;
  sexo: string = '';

  // 2. Variables del Resultado
  nombreCompleto: string = '';
  edad: number | null = null;
  signo: string = '';
  imagenSigno: string = '';
  mostrarResultado: boolean = false;

  // 3. Arreglo ordenado con el residuo del año (año % 12)
  signos: string[] = [
    'mono',      // residuo 0
    'gallo',     // residuo 1
    'perro',     // residuo 2
    'cerdo',     // residuo 3
    'rata',      // residuo 4
    'buey',      // residuo 5
    'tigre',     // residuo 6
    'conejo',    // residuo 7
    'dragon',    // residuo 8
    'serpiente', // residuo 9
    'caballo',   // residuo 10
    'cabra'      // residuo 11
  ];

  // 4. Función del Botón Imprimir
  imprimir(): void {
    if (this.anio) {
      // Nombre completo
      this.nombreCompleto = `${this.nombre} ${this.apaterno} ${this.amaterno}`;

      // Cálculo de Edad
      this.edad = 2026 - this.anio;

      // Obtener el Signo usando el operador Residuo (%)
      const pos = this.anio % 12;
      this.signo = this.signos[pos];

      // Nombre de la imagen en la carpeta public
      if (this.signo === 'dragón') {
        this.imagenSigno = 'dragon.png';
      } else {
        this.imagenSigno = `${this.signo}.png`;
      }

      // Mostrar resultados
      this.mostrarResultado = true;
    }
  }
}