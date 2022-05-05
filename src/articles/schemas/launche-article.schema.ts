import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LauncheDocument = Launche & Document;

@Schema()
export class Launche {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  provider: string;
}

export const LauncheSchema = SchemaFactory.createForClass(Launche);
