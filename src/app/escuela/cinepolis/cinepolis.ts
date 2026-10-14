import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cinepolis',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cinepolis.html',
  styleUrl: './cinepolis.css'
})
export class CinepolisComponent implements OnInit {
  formulario!: FormGroup;
  nombreCliente: string = '';
  totalPagar: number = 0;
  mensajeError: string = '';
  procesado: boolean = false;
  indiceEdicion: number = -1;
  readonly PRECIO_BOLETA = 12000;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      compradores: new FormControl(1, [Validators.required, Validators.min(1)]),
      tarjetaCineco: new FormControl('no', Validators.required),
      boletas: new FormControl(1, [Validators.required, Validators.min(1)])
    });

    // Revisar si hay un registro pendiente de edición
    const datosEdicion = localStorage.getItem('editandoCinepolis');
    if (datosEdicion) {
      const item = JSON.parse(datosEdicion);
      this.indiceEdicion = item.index;
      
      this.formulario.patchValue({
        nombre: item.nombre,
        compradores: item.compradores,
        tarjetaCineco: item.tarjeta,
        boletas: item.boletas
      });

      // Calculamos de una vez el total para mostrarlo
      this.nombreCliente = item.nombre;
      this.totalPagar = item.total;
      this.procesado = true;

      // Limpiamos la variable temporal de edición para que no se quede trabada
      localStorage.removeItem('editandoCinepolis');
    }
  }

  procesar(): void {
    this.mensajeError = '';
    this.procesado = false;

    const nombre = this.formulario.get('nombre')?.value;
    const compradores = Number(this.formulario.get('compradores')?.value);
    const tieneTarjeta = this.formulario.get('tarjetaCineco')?.value === 'si';
    const boletas = Number(this.formulario.get('boletas')?.value);

    // Validación: Máximo 7 boletas por comprador
    const maxBoletasPermitidas = compradores * 7;
    if (boletas > maxBoletasPermitidas) {
      this.mensajeError = `No se pueden comprar más de 7 boletas por persona. El máximo para ${compradores} comprador(es) es de ${maxBoletasPermitidas} boletas.`;
      return;
    }

    // Cálculo del costo base
    let total = boletas * this.PRECIO_BOLETA;

    // Descuento por cantidad de boletas
    if (boletas > 5) {
      total = total * 0.85; // 15% de descuento
    } else if (boletas >= 3) {
      total = total * 0.90; // 10% de descuento
    }

    // Descuento adicional por Tarjeta Cineco
    if (tieneTarjeta) {
      total = total * 0.90; // 10% adicional
    }

    this.nombreCliente = nombre;
    this.totalPagar = total;
    this.procesado = true;
  }

  verRegistro(): void {
    if (!this.procesado) {
      alert('Primero debes procesar una compra antes de ver el registro.');
      return;
    }

    const compraActual = {
      nombre: this.nombreCliente,
      compradores: this.formulario.get('compradores')?.value,
      tarjeta: this.formulario.get('tarjetaCineco')?.value,
      boletas: this.formulario.get('boletas')?.value,
      total: this.totalPagar
    };

    let guardados = JSON.parse(localStorage.getItem('registrosCinepolis') || '[]');

    if (this.indiceEdicion !== -1) {
      // Si estábamos editando, reemplazamos el elemento en esa posición
      guardados[this.indiceEdicion] = compraActual;
      this.indiceEdicion = -1;
    } else {
      // Si es nuevo, lo agregamos al final
      guardados.push(compraActual);
    }

    localStorage.setItem('registrosCinepolis', JSON.stringify(guardados));

    // Redirigir a la vista de registros
    this.router.navigate(['/escuela/ver-registro']);
  }
}