export interface Registro {
  usuario: {
    _id: string;
    nombre: string;
    activo: boolean;
  };
  _id: string;
  fecha: any;
  entrada: string;
  salida: string;
  motivo_salida: string;
  localizacion_entrada: string;
  localizacion_salida: string;
  horas_totales: string;
  diferencia: any;
  diferenciaMs: any;
}
