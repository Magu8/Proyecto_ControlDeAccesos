import { Module } from '@nestjs/common';
import { WorkersController } from './workers.controller';
import { WorkersService } from './workers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Worker, WorkerSchema } from './worker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Worker.name,
        schema: WorkerSchema,
      },
    ]),
  ],
  controllers: [WorkersController],
  providers: [WorkersService],
  exports: [WorkersService],
})
export class WorkersModule {}
