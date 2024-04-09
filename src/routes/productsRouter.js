import { Router } from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productsController.js';

const productsRouter = Router();

// GET: Obtienes todos los productos, podes filtrar por status o category, poner cuantas paginas, limite u ordenarlos
productsRouter.get('/', async (req, res) => {
  try {
    // limit entre {} porque puede existir mas de un elemento para buscar. http://localhost:8000/products?limit=2
    const { limit, pages, filter, ord } = req.query;

    const prods = await getProducts(limit, pages, filter, ord);

    // la peticion fue correcta
    res.status(200).send(prods);
  } catch (error) {
    res.status(500).render('templates/error', {
      error: error,
    });
  }
});

// GET: Obtienes un producto por su id
// : significa que es modificable (puede ser un 4 como un 10 como un 75)
productsRouter.get('/:pid', async (req, res) => {
  try {
    const idProduct = req.params.pid; //Todo dato que se consulta desde un parametro es un string

    // Llamo al controlador
    const prod = await getProduct(idProduct);

    if (prod) res.status(200).send(prod);
    else res.status(404).send('Producto no existe');
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al consultar producto: ${error}`);
  }
});

// POST: Es para crear un nuevo producto
productsRouter.post('/', async (req, res) => {
  try {
    // todo dato que se consulta desde un parametro es un string, si es un numero hay que parsearlo
    const product = req.body;

    const message = await createProduct(product);

    res.status(201).send(message);
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al crear producto: ${error}`);
  }
});

// PUT: Es para actualizar un producto segun su id
productsRouter.put('/:pid', async (req, res) => {
  try {
    // todo dato que se consulta desde un parametro es un string, si es un numero hay que parsearlo
    const idProduct = req.params.pid;
    const upProduct = req.body;
    const product = await updateProduct(idProduct, upProduct);

    res.status(200).send(product);
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al actualizar producto: ${error}`);
  }
});

// DELETE: Es para eliminar un producto segun su id
productsRouter.delete('/:pid', async (req, res) => {
  try {
    const idProduct = req.params.pid;
    const message = await deleteProduct(idProduct);
    res.status(200).send(message);
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al eliminar producto: ${error}`);
  }
});

export default productsRouter;
