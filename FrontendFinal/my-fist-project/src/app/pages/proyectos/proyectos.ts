import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';

import { ProyectoService } from '../../services/proyecto.service';
import { ProyectoDto } from '../../interfaces/proyecto.dto';

@Component({
  selector: 'app-proyectos',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatChipsModule
  ],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.css'
})
export class ProyectosComponent implements OnInit {
  proyectos: ProyectoDto[] = [];
  form: FormGroup;
  cargando = false;
  cargandoLista = false;

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', Validators.maxLength(255)]
    });
  }

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.cargandoLista = true;
    this.proyectoService.getProyectos().subscribe({
      next: (data) => {
        this.proyectos = data;
        this.cargandoLista = false;
      },
      error: () => {
        this.snackBar.open('Error al cargar proyectos', 'Cerrar', { duration: 3000 });
        this.cargandoLista = false;
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) return;
    this.cargando = true;

    this.proyectoService.createProyecto(this.form.value).subscribe({
      next: () => {
        this.snackBar.open('Proyecto creado exitosamente', 'Cerrar', { duration: 3000 });
        this.form.reset();
        this.cargarProyectos();
        this.cargando = false;
      },
      error: () => {
        this.snackBar.open('Error al crear proyecto', 'Cerrar', { duration: 3000 });
        this.cargando = false;
      }
    });
  }

  inicialNombre(nombre: string): string {
    return nombre?.charAt(0)?.toUpperCase() || 'P';
  }

  colorAvatar(index: number): string {
    const colores = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    return colores[index % colores.length];
  }
}
