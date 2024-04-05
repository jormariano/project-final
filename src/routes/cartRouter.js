import { Router } from 'express';
import cartModel from '../models/cart.js';

const cartRouter = Router();

// Creamos un carrito
cartRouter.post('/', async (req, res) => {
  try {
    const message = await cartModel.create({ products: [] });
    res.status(201).send(message);
  } catch (e) {
    res
      .status(500)
      .send(`Error interno del servidor al crear carrito: ${error}`);
  }
});

// Se consulta el carrito por su id
cartRouter.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartModel.findOne({ _id: cartId });
    res.status(200).send(cart);
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al consultar carrito: ${error}`);
  }
});

// Se crea un nuevo producto en el carrito
cartRouter.post('/:cid/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;
    const cart = await cartModel.findById(cartId);

    const index = cart.products.findIndex(
      // id_prod se solicita en cart.js como id de referencia p/ conectar cart con el producto
      (product) => product.id_prod == productId
    );

    if (index != -1) {
      cart.products[index].quantity = quantity;
    } else {
      cart.products.push({ id_prod: productId, quantity: quantity });
    }

    const message = await cartModel.findByIdAndUpdate(cartId, cart);
    res.status(200).send(message);
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al crear producto: ${error}`);
  }
});

// DELETE: Es para eliminar un producto segun su id en el carrito
cartRouter.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const updatedCart = await cartModel.findOneAndUpdate(
      { _id: cartId },

      // Se elimina el producto del array segun el id
      { $pull: { products: { id_prod: productId } } },

      // Se devuelve el carrito actualizado
      { new: true }
    );

    if (updatedCart) {
      res
        .status(200)
        .send('Producto eliminado del carrito correctamente.', updatedCart);
    } else {
      res.status(404).send('Carrito no encontrado');
    }
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al eliminar producto: ${error}`);
  }
});

cartRouter.delete('/:cid/products', async (req, res) => {
  try {
    const cartId = req.params.cid;

    const updatedCart = await cartModel.findByIdAndUpdate(
      cartId,

      // Se establece el array de productos como vacío
      { products: [] },

      // Se devuelve el carrito actualizado
      { new: true }
    );

    if (updatedCart) {
      res.status(200).send(updatedCart);
    } else {
      res.status(404).send('Carrito no encontrado.');
    }
  } catch (error) {
    res
      .status(500)
      .send(
        `Error interno del servidor al eliminar productos del carrito: ${error}`
      );
  }
});

// PUT: Actualiza la cantidad en el carrito
cartRouter.put('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;

    if (isNaN(quantity) || quantity < 0) {
      return res.status(400).send('Cantidad invalida');
    }

    const updatedCart = await cartModel.findOneAndUpdate(
      { _id: cartId, 'products.id_prod': productId },

      // Se actualiza el carrito
      { $set: { 'products.$.quantity': quantity } },

      // Se devuelve el carrito actualizado
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).send('Carrito o producto no encontrado');
    }

    res.status(200).send(updatedCart);
  } catch (error) {
    res.status(500).send(`Error interno del servidor: ${error}`);
  }
});

export default cartRouter;
