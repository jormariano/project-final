import productsRouter from './productsRouter.js';
import cartRouter from './cartRouter.js';
import chatRouter from './chatRouter.js';
import userRouter from './userRouter.js';
import sessionRouter from './sessionRouter.js';
import upload from '../config/multer.js';
import express from 'express';
import { __dirname } from '../path.js';

const indexRouter = express.Router();

// Routes
indexRouter.get('/', (req, res) => {
  res.status(200).send('Bienvenid@ !');
});
indexRouter.use('/public', express.static(__dirname + '/public'));
indexRouter.use(
  '/api/products',
  productsRouter,
  express.static(__dirname + '/public')
);
indexRouter.use('/api/cart', cartRouter);
indexRouter.use('/api/chat', chatRouter, express.static(__dirname + '/public'));
indexRouter.use('/api/users', userRouter);
indexRouter.use('/api/session', sessionRouter);

// Se agrega el middleware entre la ruta('/upload') y el contenido de la ruta((req, res) => {) para subir imagenes
// .single() es un metodo de multer para enviar solo un elemento a la vez
indexRouter.post('/upload', upload.single('product'), (req, res) => {
  try {
    console.log(req.file);
    res.status(200).send('Imagen cargada correctamente');
  } catch (e) {
    res.status(500).send('Error al cargar imagen');
  }
});

/*

// Al ir a static renderiza lo que aparece en home.handlebars
app.get('/static', (req, res) => {
  const products = [
    {
      id: 1,
      title: 'El principito',
      price: 2000,
      stock: 5,
      img: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/594472.jpg',
    },
  ];
  res.render('templates/products', {
    showProducts: true,
    products: products,
    css: 'home.css',
  });
});

*/

export default indexRouter;
