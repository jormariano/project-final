import { Router } from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productsController.js';

const productsRouter = Router();

// GET: Obtienes todos los productos
productsRouter.get('/', getProducts);

// GET: Obtienes un producto por su id
// : significa que es modificable (puede ser un 4 como un 10 como un 75)
productsRouter.get('/:pid', getProduct);

// POST: Es para crear un nuevo producto
productsRouter.post('/', createProduct);

// PUT: Es para actualizar un producto segun su id
productsRouter.put('/:pid', updateProduct);

// DELETE: Es para eliminar un producto segun su id
productsRouter.delete('/:pid', deleteProduct);

export default productsRouter;
