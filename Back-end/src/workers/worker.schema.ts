import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkerDocument = Worker & Document;

@Schema()
export class Worker {
  @Prop()
  nombre: string;
  @Prop({ unique: true })
  username: string;
  @Prop()
  password: string;
  @Prop({ default: false })
  admin: boolean;
  @Prop({ default: false })
  activo: boolean;
  @Prop()
  image: string;
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);
