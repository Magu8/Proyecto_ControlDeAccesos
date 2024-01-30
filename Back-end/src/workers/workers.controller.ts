import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { WorkersService } from './workers.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('insertWorker')
  async addWorker(@Body() body: any): Promise<any> {
    try {
      await this.workersService.insertWorker(body);
      return {
        msg: 'Trabajador creado correctamente',
        estado: 201,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('getWorkers')
  async workers(): Promise<any> {
    try {
      return await this.workersService.getWorkers();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
