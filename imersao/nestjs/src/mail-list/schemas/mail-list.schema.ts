import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema()
export class MailList {
  @Prop({ type: SchemaTypes.ObjectId })
  id: string;

  @Prop({ type: [String] })
  emails: string[];
}

export const MailListSchema = SchemaFactory.createForClass(MailList);

export type MailListDocument = MailList & Document;
