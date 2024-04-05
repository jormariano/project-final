import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    require: true,
  },
  rol: {
    type: String,
    default: 'User',
  },
});

export const userModel = model('users', userSchema);
