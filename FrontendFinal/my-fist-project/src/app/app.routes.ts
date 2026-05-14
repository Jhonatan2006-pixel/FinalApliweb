import { Routes } from '@angular/router';
import { ProyectosComponent } from './pages/proyectos/proyectos';
import { TareasComponent } from './pages/tareas/tareas';

export const routes: Routes = [
  { path: '', redirectTo: 'proyectos', pathMatch: 'full' },
  { path: 'proyectos', component: ProyectosComponent },
  { path: 'tareas', component: TareasComponent }
];
