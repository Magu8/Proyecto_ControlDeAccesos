import { Injectable } from '@nestjs/common';
import { Worker, WorkerDocument } from './worker.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WorkersService {
  constructor(
    @InjectModel(Worker.name) private workerModel: Model<WorkerDocument>,
  ) {}

  async insertWorker(body: any): Promise<any> {
    try {
      await this.workerModel.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('El usuario ya existe');
      }
      throw error;
    }
  }

  async findWorker(username: any): Promise<any> {
    let worker = await this.workerModel.findOne({ username }).lean();
    if (!worker) {
      return 'Trabajador no encontrado';
    }
    return worker;
  }

  async getWorkers(): Promise<any> {
    let workersData = await this.workerModel.find();
    // console.log(workersData);

    let formattedData = workersData.map((worker) => ({
      nombre: worker.nombre,
      usuario: worker.username,
      image: worker.image,
      sub: worker._id,
      activo: worker.activo,
    }));

    return formattedData;
  }
}
