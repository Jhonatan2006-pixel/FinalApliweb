import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProyectoDto, CrearProyectoDto } from '../interfaces/proyecto.dto';

@Injectable({ providedIn: 'root' })
export class ProyectoService {
  private apiUrl = 'http://localhost:3000/api/proyectos';

  constructor(private http: HttpClient) {}

  getProyectos(): Observable<ProyectoDto[]> {
    return this.http.get<ProyectoDto[]>(this.apiUrl);
  }

  createProyecto(data: CrearProyectoDto): Observable<ProyectoDto> {
    return this.http.post<ProyectoDto>(this.apiUrl, data);
  }
}
