import { Schema, model } from 'mongoose';
import cartModel from './cart.js';

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    index: true,
  },
  rol: {
    type: String,
    default: 'User',
  },
  cart_id: {
    type: Schema.Types.ObjectId,
    // Hace referencia al carrito
    ref: 'carts',
  },
});

userSchema.pre('save', async function (next) {
  try {
    // Dentro del model user, llamo a otro modelo para crear un nuevo carrito
    const newCart = await cartModel.create({ products: [] });

    // this hace referencia al objeto que se esta creando en este momento
    this.cart_id = newCart._id;
  } catch (e) {
    next(e);
  }
});

userSchema.pre('find', async function (next) {
  try {
    const prods = await cartModel.findOne({ _id: '66187e8780b7dc7f0f7c8138' });
    console.log(prods);

    // es un populate del carrito que tiene un populate de los productos
    this.populate('cart_id');
  } catch (e) {
    next(e);
  }
});

export const userModel = model('users', userSchema);
