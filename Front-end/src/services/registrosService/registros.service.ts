import { Injectable } from '@angular/core';
import { Registro } from '../../model/registro';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {
  constructor() { }

  anios() {
    const years: number[] = [];
    const days: number[] = [];
    const anios = new Date().getFullYear();
    for (let i = 0; i < 30; i++) {
      years.push(anios - i);
    }

    for (let i = 1; i < 31; i++) {
      days.push(i);
    }
    return { "años": years, "dias": days };
  }


  getItems(registros: Registro[], paginaActual: number, itemsPorPagina: number): any[] {
    const startIndex = (paginaActual - 1) * itemsPorPagina;
    const endIndex = startIndex + itemsPorPagina;
    return registros.slice(startIndex, endIndex);
  }

  calcularHorasDiferencia(registro: Registro[]) {
    registro.forEach(reg => {
      const horaEntrada = new Date(reg.entrada).getTime();
      const horaSalida = new Date(reg.salida).getTime();
      if (!isNaN(horaEntrada) && !isNaN(horaSalida)) {
        const diferenciaEnMs: number = horaSalida - horaEntrada;
        const semanas: number = Math.floor(diferenciaEnMs / (1000 * 60 * 60 * 24 * 7));
        const dias: number = Math.floor((diferenciaEnMs % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
        const horas: number = Math.floor((diferenciaEnMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos: number = Math.floor((diferenciaEnMs % (1000 * 60 * 60)) / (1000 * 60));
        reg.diferenciaMs = diferenciaEnMs / 60000;
        if (semanas == 0) {
          if (dias == 0) {
            reg.diferencia = `${horas < 10 ? "0" + horas : horas}:${minutos < 10 ? "0" + minutos : minutos}`;
          } else {
            reg.diferencia = `${dias} días ${horas < 10 ? "0" + horas : horas}:${minutos < 10 ? "0" + minutos : minutos}`;
          }
        } else {
          reg.diferencia = `${semanas} semanas ${dias} días ${horas < 10 ? "0" + horas : horas}:${minutos < 10 ? "0" + minutos : minutos}`;
        }
      } else {
        reg.diferencia = '-';
      }

    })
  }
  //con reduce reducimos el valor de un array a un valor en este cado el de tiempo
  //desestructuramos el objetocon split y lo pasamos a numbers 
  //y luego calculameos el tiempo
  //total valor y inicial lo indicamos con ,0 
  //con reduce cuando nos encontrams un return acabmos para ese elemento no con la ejecucion con lo que sigue calculando
  //entonces cuando no encontramos un - devolvemos el calculo que estaba antes y sigue la ejecucion con la siguiente "fila"
  //y cuando nos encontramos algo diferente a - hace el calculo
  sumarHoras(registros: Registro[]) {
    const minutosTotales = registros.reduce((total, tiempo) => {
      if (tiempo.diferenciaMs !== '-') {
        tiempo.diferenciaMs
        return total + parseInt(tiempo.diferenciaMs);
      }
      return total;
    }, 0);


    //llega aqui despues de habe sacado los minutos totales despues del reduce 
    const horas = Math.floor(minutosTotales / 60);
    const minutos = minutosTotales % 60;

    return `${horas} horas ${minutos} minutos`;

  }

}
