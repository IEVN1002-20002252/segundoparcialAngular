import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// CAMBIA ESTA LÍNEA (debe terminar en /usuario en lugar de /usuario.component):
import { UsuarioComponent } from './formulario/usuario/usuario';

import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UsuarioComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements AfterViewInit {
  title = 'segundoparcialAngular';

  ngAfterViewInit(): void {
    initFlowbite();
  }
}
