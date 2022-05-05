import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  provider: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
