import cartModel from '../models/cart.js';
import productModel from '../models/product.js';
import { userModel } from '../models/user.js';

export const getCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartModel.findOne({ _id: cartId });
    res.status(200).send(cart);
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al consultar carrito: ${error}`);
  }
};

export const createCart = async (req, res) => {
  try {
    const message = await cartModel.create({ products: [] });
    res.status(201).send(message);
  } catch (e) {
    res
      .status(500)
      .send(`Error interno del servidor al crear carrito: ${error}`);
  }
};

export const insertProductCart = async (req, res) => {
  try {
    if (req.user.rol == 'User') {
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
    } else {
      res.status(403).send('Usuario no autorizado');
    }
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al crear producto: ${error}`);
  }
};

export const createTicket = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartModel.findById(cartId);
    let prodSinStock = [];

    if (cart) {
      cart.products.forEach(async (prod) => {
        let producto = await productModel.findById(prod.id_prod);
        if (producto.stock - prod.quantity < 0) {
          prodSinStock.push(producto);
        }
      });
      if (prodSinStock.length == 0) {
        // Finalizar compra
      } else {
        // Retornar 'Producto sin stock'
      }
    } else {
      res.status(404).send('Cart no existe');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
