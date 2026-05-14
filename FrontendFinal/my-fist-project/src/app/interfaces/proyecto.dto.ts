export interface ProyectoDto {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface CrearProyectoDto {
  nombre: string;
  descripcion?: string;
}
