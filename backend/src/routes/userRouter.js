import { Router } from 'express';
import { getUsers } from '../controllers/userController.js';

const userRouter = Router();

// Obtenes los usuarios creados
userRouter.get('/', getUsers);

/*
// Crear un usuario
userRouter.post('/', async (req, res) => {
  try {
    const { name, lastname, email, age, password } = req.body;
    const result = await userModel.create({
      name,
      lastname,
      email,
      age,
      password,
    });
    res.status(201).send(result);
  } catch (e) {
    res.status(500).send('Error al crear usuarios: ', e);
  }
});

*/

export default userRouter;
