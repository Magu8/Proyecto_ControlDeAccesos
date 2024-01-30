export interface Responsable {
    nombre: string,
    _id: string,
    // Otros atributos relacionados con el responsable si los hay
}
export interface Tarea {
    descripcion: string,
    completado: boolean,
    responsable: Responsable,
    _id: string
}
