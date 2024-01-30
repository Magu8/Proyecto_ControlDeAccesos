import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Register, RegisterDocument } from './register.schema';
import { Worker, WorkerDocument } from '../workers/worker.schema';

import { Model } from 'mongoose';

function currentDate() {
  let currentDay = new Date();
  let day = currentDay.getDate();
  let month = currentDay.getMonth();
  let year = currentDay.getFullYear();

  let thisDay = `${year}/${month + 1}/${day}`;
  return thisDay;
}
function currentTime() {
  let currentTime = new Date();
  let currentHour = currentTime.getHours();
  let currentMinutes = currentTime.getMinutes().toString().padStart(2, '0');

  let thisTime = `${currentHour}:${currentMinutes}`;

  return thisTime;
}

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(Register.name) private registerModel: Model<RegisterDocument>,
    @InjectModel(Worker.name) private workerModel: Model<WorkerDocument>,
  ) { }

  async addFichar(id: any, body: any): Promise<any> {
    let worker = await this.workerModel.findById(id);
    if (!worker) {
      return 'No fichaste correctamente';
    }

    worker.activo = true;
    worker.save();

    return await this.registerModel.create({
      fecha: currentDate(),
      entrada: currentDate() + ' ' + currentTime(),
      usuario: worker._id,
      localizacion_entrada: body.localizacion_entrada,
    });
  }

  async addDesfichar(id: any, body: any): Promise<any> {
    let worker = await this.workerModel.findById(id);
    if (!worker) {
      return 'Nos desfichaste correctamente';
    }

    const registroSalida = await this.registerModel.findOne({
      usuario: id,
      salida: '-',
    });

    if (!registroSalida) {
      return 'No hay registro sin desfichar';
    }

    registroSalida.salida = currentDate() + ' ' + currentTime();
    registroSalida.localizacion_salida = body.localizacion_salida;
    registroSalida.motivo_salida = body.motivo_salida;
    await registroSalida.save();

    worker.activo = false;
    await worker.save();

    return { mensaje: 'Has Salido', horaSalida: registroSalida.salida };
  }

  async getYourRegistro(id: any): Promise<any> {
    return await this.registerModel
      .find({ usuario: id })
      .populate('usuario', 'nombre activo');
  }

  async getRegistros(): Promise<any> {
    return await this.registerModel.find();
  }

  async editarRegistro(id: any, body: any): Promise<any> {
    let registroActualizado = await this.registerModel.findByIdAndUpdate(id, {
      $set: {
        salida: body.salida,
        motivo_salida: body.motivo_salida
      },
    });

    await this.workerModel.findOneAndUpdate(registroActualizado.usuario._id, {
      $set: { activo: false },
    });

    return registroActualizado;
  }

  async editarRegistroEntrada(id: any, body: any): Promise<any> {
    let registroActualizado = await this.registerModel.findByIdAndUpdate(id, {
      $set: {
        entrada: body.entrada,
        motivo_salida: body.motivo_salida
      },
    });

    await this.workerModel.findOneAndUpdate(registroActualizado.usuario._id, {
      $set: { activo: true },
    });

    return registroActualizado;
  }

  async deleteRegistro(id: any): Promise<any> {
    return await this.registerModel.findByIdAndDelete(id);
  }
}
