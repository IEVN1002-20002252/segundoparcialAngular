import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlumnosUtl } from './alumnos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoapiService {

  private apiURL = 'http://127.0.0.1:5000/api/alumnos/';

  constructor(private http: HttpClient) { }

  public getAlumnos(): Observable<any> {
    return this.http.get<any>(this.apiURL);
  }

  // Métodos para agregar un nuevo alumno (cubre tanto 'agregarAlumno' como 'addAlumno')
  public agregarAlumno(alumno: any): Observable<any> {
    return this.http.post<any>(this.apiURL, alumno);
  }

  public addAlumno(alumno: any): Observable<any> {
    return this.http.post<any>(this.apiURL, alumno);
  }

  // Método para eliminar un alumno por su matrícula en la API de Flask
  public deleteAlumno(matricula: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}${matricula}`);
  }
}