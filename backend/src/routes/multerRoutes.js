import { Router } from 'express';
import { insertImg } from '../controllers/multerController.js';
import upload from '../config/multer.js';

const multerRouter = Router();

// .single() es un metodo de multer para enviar solo un elemento a la vez
multerRouter.post('/', upload.single('product'), insertImg);

export default multerRouter;
