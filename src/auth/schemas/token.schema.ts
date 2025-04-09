import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type TokenType = 'access' | 'refresh';

@Schema({ timestamps: true })
export class Token extends Document {
  @Prop({ required: true })
  token: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;
  // You can have multiple token like OTP,etc. Only store refresh token in database. Delete if logout
  @Prop({ type: String, enum: ['refresh'], required: true })
  type: TokenType;

  @Prop({ required: true })
  expiresAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
// This index will automatically delete the token after it expires
TokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
