import { Router } from 'express';
import productModel from '../models/product.js';

const productsRouter = Router();

// GET: Obtienes todos los productos, podes filtrar por status o category, poner cuantas paginas, limite u ordenarlos
productsRouter.get('/', async (req, res) => {
  try {
    // limit entre {} porque puede existir mas de un elemento para buscar. http://localhost:8000/products?limit=2
    const { limit, pages, filter, ord } = req.query;

    // Puede modificarse el metodo a filtrar por status o category
    let metFilter;

    // Si la pagina enviada (pages) es distinta de undefined se consulta por pages, sino por defecto consulto por 1
    const page = pages != undefined ? pages : 1;

    const limi = limit != undefined ? limit : 10;

    // filtramos por status(disponibilidad) y sino por categoria
    if (filter == 'true' || filter == 'false') {
      metFilter = 'status';
    } else {
      if (filter !== undefined) metFilter = 'category';
    }

    const query = metFilter != undefined ? { [metFilter]: filter } : {};

    // Consulto por el metodo de ordenamiento: http://localhost:8000/api/products?&ord=desc
    const ordQuery = ord !== undefined ? { price: ord } : {};

    // .paginate({metodo de ordenamiento}, {limite}, {page}); Asi decis que se filtra por eso:
    // Se filtra aca porque puede filtrar por status o por category
    const prods = await productModel.paginate(query, {
      limit: limi,
      pages: page,
      sort: ordQuery,
    });

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

    // Cambie productManager.getProductById(idProduct); por:
    const prod = await productModel.findById(idProduct);

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

    // Cambie productManager.addProduct(product); por:
    const message = await productModel.create(product);

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
    const updateProduct = req.body;
    const product = await productModel.findByIdAndUpdate(
      idProduct,
      updateProduct
    );

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
    const message = await productModel.findByIdAndDelete(idProduct);

    res.status(200).send(message);
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al eliminar producto: ${error}`);
  }
});

export default productsRouter;
