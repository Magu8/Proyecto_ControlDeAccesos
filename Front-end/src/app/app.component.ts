import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FirstConexionComponent } from '../components/first-conexion/first-conexion.component';
import { LoginComponent } from '../components/login/login.component';
import { TablaRegistrosComponent } from '../components/tu-registro/tabla-registros.component';
import { HeaderComponent } from '../components/header/header.component';
import { RegisterWorkerComponent } from '../components/all-trabajadores/register-worker.component';
import { FicharComponent } from '../components/fichar/fichar.component';
import { FelicesFiestasComponent } from './felices-fiestas/felices-fiestas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    FirstConexionComponent,
    LoginComponent,
    HeaderComponent,
    TablaRegistrosComponent,
    RegisterWorkerComponent,
    FicharComponent,
    FelicesFiestasComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Irontec··';
}
