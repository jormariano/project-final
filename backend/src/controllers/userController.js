import { userModel } from '../models/user.js';

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send('Error al consultar usuarios: ', e);
  }
};

export const sendDocuments = async (req, res) => {
  try {
    const { uid } = req.params;

    const newDocs = req.body;

    const user = await userModel.findByIdAndUpdate(
      uid,
      {
        // push & each son metodos de mongoDB
        $push: {
          documents: {
            $each: newDocs,
          },
        },
      },
      { new: true }
    );

    if (!user) {
      res.status(404).send('User no existe');
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Controlador para cargar imagenes
export const imageProds = (req, res) => {};
