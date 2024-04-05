import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const productSchema = new Schema({
  title: {
    type: String,
    require: true,
    index: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  code: {
    type: String,
    require: true,
    unique: true,
  },
  thumbnail: {
    default: [],
  },
});

productSchema.plugin(paginate);

const productModel = model('products', productSchema);

export default productModel;
