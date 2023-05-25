import * as mongoose from 'mongoose';

export const ClientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: Number,
  address: {
    city: String,
    zone: String,
    street: String,
  },
});
