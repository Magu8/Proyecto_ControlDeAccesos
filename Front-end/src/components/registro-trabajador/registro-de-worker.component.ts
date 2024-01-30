import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkersServiceService } from '../../services/workersService/workers-service.service';
import { Registro } from '../../model/registro';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { editRegistro, editRegistroEntrada } from '../../model/editRegistro';
import { RegistrosService } from '../../services/registrosService/registros.service';

@Component({
  selector: 'app-registro-de-worker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-de-worker.component.html',
  styleUrl: './registro-de-worker.component.css',
})
export class RegistroDeWorkerComponent {
  fechaFormateada: string = '';
  fechaFormateadaEntrada: string = '';
  localizacion_salida: string = '';
  motivo_salida: string = '';
  // editRegistro: editRegistro = {
  //   salida: '',
  //   localizacion_salida: '',
  //   motivo_salida: '',
  // };

  workerId?: string;
  registros: Registro[] = [];
  registroAEditar: string | null = null;
  paginaActual: number = 1;
  itemsPorPagina: number = 5;
  totalItems: number = 0;
  years: number[] = [];
  days: number[] = [];
  months: any[] = [
    { nombre: 'Enero', numero: 1 },
    { nombre: 'Febrero', numero: 2 },
    { nombre: 'Marzo', numero: 3 },
    { nombre: 'Abril', numero: 4 },
    { nombre: 'Mayo', numero: 5 },
    { nombre: 'Junio', numero: 6 },
    { nombre: 'Julio', numero: 7 },
    { nombre: 'Agosto', numero: 8 },
    { nombre: 'Septiembre', numero: 9 },
    { nombre: 'Octubre', numero: 10 },
    { nombre: 'Noviembre', numero: 11 },
    { nombre: 'Diciembre', numero: 12 },
  ];
  registrosPaginados: Registro[] = [];
  anioSelected: string = '';
  mesSelected: any = '';
  diaSelected: any = '';
  disableMonth: boolean = true;
  disableDay: boolean = true;
  totalHoras?: string;

  constructor(
    private workersService: WorkersServiceService,
    private route: ActivatedRoute,
    private registrosService: RegistrosService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.workerId = params['workerId'];
      this.registroTrabajador(
        this.anioSelected,
        this.mesSelected,
        this.diaSelected
      );
      this.years = this.registrosService.anios().años;
      this.days = this.registrosService.anios().dias;
    });
  }
  // actualizarSalida() {
  //   this.editRegistro.salida = this.fechaFormateada.replace('T', ' ').replace(/-/g, '/');
  // }

  registroTrabajador(
    anioSelected: string,
    mesSelected: string,
    diaSelected: string
  ) {
    if (this.workerId) {
      const id = this.workerId;
      this.workersService.horariosWorker(id).subscribe((data) => {
        data.reverse();
        if (anioSelected === '') {
          this.registros = data;
        } else if (
          anioSelected !== '' &&
          mesSelected === '' &&
          diaSelected === ''
        ) {
          this.registros = data.filter((registro) =>
            registro.fecha.includes(anioSelected)
          );
          this.disableMonth = false;
        } else if (
          anioSelected !== '' &&
          mesSelected !== '' &&
          diaSelected === ''
        ) {
          this.registros = data.filter((registro) =>
            registro.fecha.includes(
              `${anioSelected}/${
                parseInt(mesSelected) < 10 ? '0' + mesSelected : mesSelected
              }`
            )
          );
          this.disableDay = false;
        } else {
          this.registros = data.filter((registro) =>
            registro.fecha.includes(
              `${anioSelected}/${
                parseInt(mesSelected) < 10 ? '0' + mesSelected : mesSelected
              }/${parseInt(diaSelected) < 10 ? '0' + diaSelected : diaSelected}`
            )
          );
        }
        this.registrosService.calcularHorasDiferencia(this.registros);
        this.totalHoras = this.registrosService.sumarHoras(this.registros);
      });
    } else {
      console.error('id no válido');
    }
  }

  editar(registroId: string) {
    this.registroAEditar = registroId;
  }
  cancelar() {
    this.registroAEditar = null;
  }

  guardarRegistroEditado(registroId: string) {
    const editRegistro: editRegistro = {
      salida: this.fechaFormateada.replace('T', ' ').replace(/-/g, '/'),
      motivo_salida: 'Modificado por Administrador',
    };
    this.workersService.editRegistro(registroId, editRegistro).subscribe(() => {
      this.registroAEditar = null;
      this.registroTrabajador(
        this.mesSelected,
        this.mesSelected,
        this.diaSelected
      );
    });
  }
  guardarRegistroEditadoEntrada(registroId: string) {
    const editRegistro: editRegistroEntrada = {
      entrada: this.fechaFormateadaEntrada.replace('T', ' ').replace(/-/g, '/'),
      motivo_salida: 'Modificado por Administrador',
    };
    this.workersService
      .editRegistroEntrada(registroId, editRegistro)
      .subscribe(() => {
        this.registroAEditar = null;
        this.registroTrabajador(
          this.mesSelected,
          this.mesSelected,
          this.diaSelected
        );
      });
  }
  getItems(): any[] {
    this.totalItems = Math.ceil(this.registros.length / this.itemsPorPagina);
    this.registrosPaginados = this.registrosService.getItems(
      this.registros,
      this.paginaActual,
      this.itemsPorPagina
    );
    return this.registrosPaginados;
  }
  filtrarHoras() {
    this.registroTrabajador(
      this.anioSelected,
      this.mesSelected,
      this.diaSelected
    );
  }
  resetSelects() {
    this.anioSelected = '';
    this.mesSelected = '';
    this.diaSelected = '';
    this.disableMonth = true;
    this.disableDay = true;

    this.registroTrabajador(
      this.anioSelected,
      this.mesSelected,
      this.diaSelected
    );
  }
}
