import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const SaleSchema = new mongoose.Schema({
  clientName: String,
  item: String,
  quantity: Number,
});
