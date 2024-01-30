import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first-conexion',
  standalone: true,
  imports: [],
  templateUrl: './first-conexion.component.html',
  styleUrl: './first-conexion.component.css'
})
export class FirstConexionComponent {

  peliculas: any = [];

  // constructor(private conexion: ConexionhttpService) { }

  // ngOnInit(): void {
  //   this.principal();
  // }
  // public principal() {
  //   this.peliculas = [];
  //   this.conexion.obtenerTodosFetch().subscribe(
  //     (lista: any) => {
  //       console.log(lista);

  //     }
  //   )

  // }


}
