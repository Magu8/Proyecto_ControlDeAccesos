import { Component, OnInit } from '@angular/core';
import { WorkersServiceService } from '../../services/workersService/workers-service.service';
import { Registro } from '../../model/registro';
import { inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { RegistrosService } from '../../services/registrosService/registros.service';

@Component({
  selector: 'app-tabla-registros',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './tabla-registros.component.html',
  styleUrl: './tabla-registros.component.css',
})
export class TablaRegistrosComponent implements OnInit {
  private store = inject(Store);
  registros: Registro[] = [];
  decodedUser?: any;
  totalHoras?: string;
  anioSelected: string = '';
  mesSelected: any = '';
  diaSelected: any = '';
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
  disableMonth: boolean = true;
  disableDay: boolean = true;
  registrosPaginados: Registro[] = [];

  constructor(
    private workerLoginService: WorkersServiceService,
    private registrosService: RegistrosService
  ) { }

  ngOnInit(): void {
    this.store.select('activeUser').subscribe((user) => {
      this.decodedUser = user;
    });
    this.registroHorario(this.anioSelected, this.mesSelected, this.diaSelected);
    this.years = this.registrosService.anios().años;
    this.days = this.registrosService.anios().dias;
  }

  filtrarHoras() {
    this.registroHorario(this.anioSelected, this.mesSelected, this.diaSelected);
  }

  registroHorario(
    anioSelected: string,
    mesSelected: string,
    diaSelected: string
  ) {
    this.paginaActual = 1;
    const id = this.decodedUser.sub;
    this.workerLoginService.horariosWorker(id).subscribe((data) => {
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
            `${anioSelected}/${mesSelected
            }`
          )
        );
        this.disableDay = false;
      } else {
        this.registros = data.filter((registro) =>
          registro.fecha.includes(
            `${anioSelected}/${mesSelected}/${diaSelected}`
          )
        );
      }

      this.registrosService.calcularHorasDiferencia(this.registros);

      this.totalHoras = this.registrosService.sumarHoras(this.registros);
    });
  }

  resetSelects() {
    this.anioSelected = '';
    this.mesSelected = '';
    this.diaSelected = '';
    this.disableMonth = true;
    this.disableDay = true;

    this.registroHorario(this.anioSelected, this.mesSelected, this.diaSelected);
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
}
