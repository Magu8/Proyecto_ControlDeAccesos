import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  descripcion: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Worker'})
  responsable: Types.ObjectId;
  @Prop({ default: false })
  completado: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
