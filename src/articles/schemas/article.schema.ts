import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Event, EventSchema } from './event-article.schema';
import { Launche, LauncheSchema } from './launche-article.schema';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ unique: true, sparse: true })
  externalId: number;

  @Prop({ required: true })
  featured: boolean;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  newsSite: string;

  @Prop({ default: '' })
  summary: string;

  @Prop({ required: true })
  publishedAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop({ type: [LauncheSchema], default: [] })
  launches: Launche[];

  @Prop({ type: [EventSchema], default: [] })
  events: Event[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
