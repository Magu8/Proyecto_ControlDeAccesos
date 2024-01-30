import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.schema';
import { Model } from 'mongoose';
import { Worker, WorkerDocument } from 'src/workers/worker.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
    @InjectModel(Worker.name)
    private readonly workerModel: Model<WorkerDocument>,
  ) { }

  async getTasks(): Promise<any> {
    let tasks = await this.taskModel.find().populate('responsable', 'nombre');

    if (tasks.length === 0) {
      return 'There are no tasks yet';
    }
    return tasks;
  }

  async addTask(body: any): Promise<any> {
    return await this.taskModel.create({ descripcion: body.descripcion });
  }

  async addResponsible(workerId: any, taskId: any): Promise<any> {
    if (workerId == 'completado') {
      let updatedTask = await this.taskModel.findByIdAndUpdate(
        taskId,
        {
          $set: { completado: true },
        },
        { new: true },
      );
      return updatedTask;

    } else if (workerId == 'tarea') {
      let updatedTask = await this.taskModel.findByIdAndUpdate(
        taskId,
        {
          $set: { responsable: null, completado: false },
        },
        { new: true },
      );
      return updatedTask;
    }
    else {
      let worker = await this.workerModel.findById(workerId);
      if (!worker) {
        return 'No worker found';
      }
      let updatedTask = await this.taskModel.findByIdAndUpdate(
        taskId,
        {
          $set: { responsable: worker._id },
        },
        { new: true },
      );
      return updatedTask;
    }
  }

  async completeTask(taskId: any): Promise<any> {
    let completedTask = await this.taskModel.findByIdAndUpdate(
      taskId,
      {
        $set: { completado: true },
      },
      { new: true },
    );
    return completedTask;
  }

  async deleteTask(taskId: any): Promise<any> {
    await this.taskModel.findByIdAndDelete(taskId);
    return 'The mentioned task has been successfully deleted';
  }

  async countTask(id: any): Promise<any> {
    return {
      tareas: await this.taskModel.find({ responsable: id, completado: false }).populate('responsable', '_id'),
      cantidad: await this.taskModel.find({ responsable: id, completado: false }).populate('responsable', '_id').countDocuments()
    }
  }
}
