import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TareaDto, CrearTareaDto, CambiarEstadoTareaDto } from '../interfaces/tarea.dto';

@Injectable({ providedIn: 'root' })
export class TareaService {
  private apiUrl = 'http://localhost:3000/api/tareas';

  constructor(private http: HttpClient) {}

  getTareas(estado?: string): Observable<TareaDto[]> {
    let params = new HttpParams();
    if (estado && estado !== 'todas') {
      params = params.set('estado', estado);
    }
    return this.http.get<TareaDto[]>(this.apiUrl, { params });
  }

  createTarea(data: CrearTareaDto): Observable<TareaDto> {
    return this.http.post<TareaDto>(this.apiUrl, data);
  }

  cambiarEstado(id: number, data: CambiarEstadoTareaDto): Observable<TareaDto> {
    return this.http.patch<TareaDto>(`${this.apiUrl}/${id}/estado`, data);
  }
}
