import { Schema, model } from 'mongoose';
import productModel from './product.js';

const cartSchema = new Schema({
  products: {
    type: [
      {
        // Hace referencia al producto, para no agregar datos repetidos
        id_prod: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'products',
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
});

// Devuelve los datos del producto con el id de referencia
cartSchema.pre('findOne', function () {
  this.populate('products.id_prod');
});

const cartModel = model('carts', cartSchema);

export default cartModel;
