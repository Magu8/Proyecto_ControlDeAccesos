import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { TablaRegistrosComponent } from '../components/tu-registro/tabla-registros.component';
import { HeaderComponent } from '../components/header/header.component';
import { FicharComponent } from '../components/fichar/fichar.component';
import { RegisterWorkerComponent } from '../components/all-trabajadores/register-worker.component';
import { RegistroDeWorkerComponent } from '../components/registro-trabajador/registro-de-worker.component';
import { FelicesFiestasComponent } from './felices-fiestas/felices-fiestas.component';
import { TareasComponent } from '../components/tareas/tareas.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'header',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: FicharComponent,
      },
      {
        path: 'registerWorker',
        component: RegisterWorkerComponent,
      },
      {
        path: 'registros',
        component: TablaRegistrosComponent,
      },
      {
        path: 'tareas',
        component: TareasComponent,
      },
      {
        path: 'felicesFiestas',
        component: FelicesFiestasComponent,
      },
      {
        path: ':workerId',
        component: RegistroDeWorkerComponent,
      },
    ],
  },
];
