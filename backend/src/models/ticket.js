import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
  // Muestra un detalle del producto en el ticket:
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products',
    },
  ],
});

const ticketModel = model('ticket', ticketSchema);

export default ticketModel;
