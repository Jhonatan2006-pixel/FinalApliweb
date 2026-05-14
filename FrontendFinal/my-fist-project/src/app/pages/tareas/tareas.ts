import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgClass, TitleCasePipe } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';

import { TareaService } from '../../services/tarea.service';
import { ProyectoService } from '../../services/proyecto.service';
import { TareaDto } from '../../interfaces/tarea.dto';
import { ProyectoDto } from '../../interfaces/proyecto.dto';

@Component({
  selector: 'app-tareas',
  imports: [
    CommonModule,
    NgClass,
    TitleCasePipe,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatBadgeModule,
    MatMenuModule
  ],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css'
})
export class TareasComponent implements OnInit {
  tareas: TareaDto[] = [];
  proyectos: ProyectoDto[] = [];
  form: FormGroup;
  cargando = false;
  cargandoLista = false;
  filtroActual = 'todas';
  mostrarFormulario = false;

  readonly estados: string[] = ['pendiente', 'en progreso', 'completada'];
  readonly filtros: string[] = ['todas', 'pendiente', 'en progreso', 'completada'];

  constructor(
    private fb: FormBuilder,
    private tareaService: TareaService,
    private proyectoService: ProyectoService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', Validators.maxLength(255)],
      estado: ['pendiente', Validators.required],
      proyecto_id: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.proyectoService.getProyectos().subscribe({
      next: (data) => { this.proyectos = data; }
    });
    this.cargarTareas();
  }

  cargarTareas(estado?: string): void {
    this.cargandoLista = true;
    const filtro = estado === 'todas' ? undefined : estado;
    this.tareaService.getTareas(filtro).subscribe({
      next: (data) => { this.tareas = data; this.cargandoLista = false; },
      error: () => {
        this.snackBar.open('Error al cargar tareas', 'Cerrar', { duration: 3000 });
        this.cargandoLista = false;
      }
    });
  }

  aplicarFiltro(estado: string): void {
    this.filtroActual = estado;
    this.cargarTareas(estado);
  }

  guardar(): void {
    if (this.form.invalid) return;
    this.cargando = true;

    this.tareaService.createTarea(this.form.value).subscribe({
      next: () => {
        this.snackBar.open('Tarea creada exitosamente', 'Cerrar', { duration: 3000 });
        this.form.reset({ estado: 'pendiente' });
        this.mostrarFormulario = false;
        this.cargarTareas(this.filtroActual);
        this.cargando = false;
      },
      error: () => {
        this.snackBar.open('Error al crear tarea', 'Cerrar', { duration: 3000 });
        this.cargando = false;
      }
    });
  }

  cambiarEstado(tarea: TareaDto, nuevoEstado: string): void {
    this.tareaService.cambiarEstado(tarea.id, { estado: nuevoEstado }).subscribe({
      next: () => {
        this.snackBar.open(`Estado cambiado a "${nuevoEstado}"`, 'Cerrar', { duration: 2000 });
        this.cargarTareas(this.filtroActual);
      },
      error: () => {
        this.snackBar.open('Error al actualizar estado', 'Cerrar', { duration: 3000 });
      }
    });
  }

  avanzarEstado(tarea: TareaDto): void {
    const siguiente = this.siguienteEstado(tarea.estado);
    if (siguiente !== tarea.estado) {
      this.cambiarEstado(tarea, siguiente);
    }
  }

  siguienteEstado(estado: string): string {
    switch (estado) {
      case 'pendiente':   return 'en progreso';
      case 'en progreso': return 'completada';
      default:            return estado;
    }
  }

  iconoEstado(estado: string): string {
    switch (estado) {
      case 'completada':  return 'check_circle';
      case 'en progreso': return 'autorenew';
      default:            return 'radio_button_unchecked';
    }
  }

  claseEstado(estado: string): string {
    return 'chip-' + estado.replace(/ /g, '-');
  }

  nombreProyecto(tarea: TareaDto): string {
    return tarea.proyecto?.nombre
      || this.proyectos.find(p => p.id === tarea.proyecto_id)?.nombre
      || 'Proyecto #' + tarea.proyecto_id;
  }

  countPor(estado: string): number {
    if (estado === 'todas') return this.tareas.length;
    return this.tareas.filter(t => t.estado === estado).length;
  }

  tareasFiltradas(): TareaDto[] {
    if (this.filtroActual === 'todas') return this.tareas;
    return this.tareas.filter(t => t.estado === this.filtroActual);
  }
}
