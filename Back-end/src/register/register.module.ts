import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { Register, RegisterSchema } from './register.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Worker, WorkerSchema } from '../workers/worker.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Register.name,
        schema: RegisterSchema,
      },
      {
        name: Worker.name,
        schema: WorkerSchema,
      }
    ]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
