import { Component, OnInit, inject } from '@angular/core';
import { WorkersServiceService } from '../../services/workersService/workers-service.service';
import { LocalitationServiceService } from '../../services/localitationService/localitation-service.service';
import { Store } from '@ngrx/store';
import { Worker } from '../../model/worker';
import { take } from 'rxjs';
import { updateActiveUser } from '../../app/actions/activeUser.actions';
import { TaskService } from '../../services/taksService/task.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fichar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './fichar.component.html',
  styleUrl: './fichar.component.css',
})
export class FicharComponent implements OnInit {
  private store = inject(Store);
  localizacion?: string;
  textoEntradaSalida?: string;
  selectedValue?: string;
  decodedUserFichar?: any;
  bloqueado?: boolean;
  tareas: any = {};

  constructor(
    private workerLoginService: WorkersServiceService,
    private localitation: LocalitationServiceService,
    private tareasService: TaskService
  ) { }

  workers?: Worker[];

  perfilWorker() {
    this.workerLoginService.allWorkers().subscribe((data) => {
      this.workers = data;
    });
  }
  ngOnInit(): void {
    this.store
      .select('activeUser')
      .pipe(take(1))
      .subscribe((user) => {
        this.decodedUserFichar = user;
        this.bloqueado = this.decodedUserFichar.activo;
      });
    this.obtenerCoodenadas();
    if (localStorage.getItem('token')) {
      this.perfilWorker();
      this.tareasService.tusTareas(this.decodedUserFichar.sub).subscribe((data) => {
        this.tareas = data.cantidad;
      })
    }
  }

  onSelectChange(event: any) {
    this.selectedValue = event.target.value;
  }

  obtenerCoodenadas() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.localitation
            .obtenerGeolocalizacion(
              position.coords.latitude,
              position.coords.longitude
            )
            .subscribe((data) => {
              this.localizacion = data.display_name;
            });
        },
        (error) => {
          console.error('Error al obtener las coordenadas', error);
        }
      );
    } else {
      console.error('no se puede obtener las coodenadas del navegador');
    }
  }

  workerFichar() {
    const id = this.decodedUserFichar.sub;
    const localizacion = { localizacion_entrada: this.localizacion };

    this.workerLoginService.fichar(id, localizacion).subscribe((data) => {
      console.log(data);

      this.textoEntradaSalida = `${data.msg}`;
      this.bloqueado = true;
    });
    //cambios de Maria para actualizar activeUser
    this.store.dispatch(
      updateActiveUser({ setActivo: this.decodedUserFichar.activo })
    );
    this.store
      .select('activeUser')
      .pipe(take(1))
      .subscribe((data) => {
        this.decodedUserFichar = data;
      });
  }
  // cambios de Maria para actualizar activeUser
  workerDesfichar() {
    const id = this.decodedUserFichar.sub;
    const localizacion = {
      localizacion_salida: this.localizacion,
      motivo_salida: this.selectedValue,
    };

    this.workerLoginService.desFichar(id, localizacion).subscribe((data) => {
      this.textoEntradaSalida = `Has Salido. Horas Trabajadas: ${data.horaSalida}`;
      this.bloqueado = false;
    });
    this.store.dispatch(
      updateActiveUser({ setActivo: this.decodedUserFichar.activo })
    );
    this.store
      .select('activeUser')
      .pipe(take(1))
      .subscribe((data) => {
        this.decodedUserFichar = data;
      });
  }
}
