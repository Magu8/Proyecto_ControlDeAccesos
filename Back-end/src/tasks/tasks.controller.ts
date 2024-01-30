import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async tareas(): Promise<any> {
    return await this.tasksService.getTasks();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/addTask')
  async addTarea(@Body() body: any): Promise<any> {
    return await this.tasksService.addTask(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/addResposible/:workerId/:taskId')
  async addResponsable(
    @Param('workerId') workerId: any,
    @Param('taskId') taskId: any,
  ): Promise<any> {
    return await this.tasksService.addResponsible(workerId, taskId);
  }
  @UseGuards(JwtAuthGuard)
  @Put('/completeTask/:taskId')
  async completeTarea(@Param('taskId') taskId: any): Promise<any> {
    return await this.tasksService.completeTask(taskId);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/deleteTask/:taskId')
  async deleteTarea(@Param('taskId') taskId: any): Promise<any> {
    return await this.tasksService.deleteTask(taskId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/count/:id')
  async tareasCantidas(@Param('id') id: string): Promise<any> {
    return await this.tasksService.countTask(id);
  }
}
