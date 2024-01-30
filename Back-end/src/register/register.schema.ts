import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type RegisterDocument = Register & Document;

@Schema()
export class Register {
  @Prop()
  fecha: string;
  @Prop()
  entrada: string;
  @Prop({ default: '-' })
  salida: string;
  @Prop({ default: '-' })
  motivo_salida: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' })
  usuario: Types.ObjectId;
  @Prop({ default: '-' })
  localizacion_entrada: string;
  @Prop({ default: '-' })
  localizacion_salida: string;
}

export const RegisterSchema = SchemaFactory.createForClass(Register);
