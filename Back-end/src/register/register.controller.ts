import {
  Controller,
  Post,
  Param,
  Put,
  Get,
  Body,
  UseGuards,
  HttpException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) { }

  @UseGuards(JwtAuthGuard)
  @Post('/fichar/:id')
  async fichar(@Param('id') id: any, @Body() body: any): Promise<any> {
    try {
      await this.registerService.addFichar(id, body);
      return {
        msg: 'Has fichado con exito',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/desfichar/:id')
  async desfichar(@Param('id') id: any, @Body() body: any): Promise<any> {
    try {
      return await this.registerService.addDesfichar(id, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('tuRegistro/:id')
  async tuRegistro(@Param('id') id: any): Promise<any> {
    try {
      return await this.registerService.getYourRegistro(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('editarRegistro/:idDelRegistro')
  async editarRegistroDelTrabajador(
    @Body() body: any,
    @Param('idDelRegistro') id: any,
  ): Promise<any> {
    try {
      await this.registerService.editarRegistro(id, body);
      return {
        msg: 'Registro modificado',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('editarRegistroEntrada/:idDelRegistro')
  async editarRegistroDelTrabajadorEntrada(
    @Body() body: any,
    @Param('idDelRegistro') id: any,
  ): Promise<any> {
    try {
      await this.registerService.editarRegistroEntrada(id, body);
      return {
        msg: 'Registro modificado',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('tablaDeRegistros')
  async registros(): Promise<any> {
    try {
      return await this.registerService.getRegistros();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('borrarRegistro/:idRegistro')
  async borrar(@Param('idRegistro') id: any): Promise<any> {
    try {
      await this.registerService.deleteRegistro(id);
      return {
        msg: 'El registro se ha borrado correctamente',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }
}
