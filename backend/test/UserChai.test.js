import mongoose from 'mongoose';
import { userModel } from '../src/models/user.js';
import * as chai from 'chai';
import varenv from '../src/dotenv.js';

const expect = chai.expect;

await mongoose
  .connect(varenv.mongo_url)
  .then(() => console.log('DB is connected'))
  .catch((e) => console.log(e));

// Primero trabaja con function y dentro con dos arrow function
describe('Test CRUD de usuarios en la ruta /api/users', function () {
  // Previo a ejecutar todo el test
  before(() => {
    console.log('Arrancando el test');
  });

  // Previo a ejecutar cada uno de los test
  beforeEach(() => {
    console.log('Comienza el test');
  });

  // Primer caso: obtengo todos los usuarios
  it('Obtener todos los usuarios mediante el metodo GET', async () => {
    const users = await userModel.find();

    //  expect(users).equal([]);
    expect(Array.isArray(users)).to.be.ok; // Si es verdadero o no
    //  expect(users).not.to.be.deep.equal([]); // Que el interior del [] no sea igual a [] vacio
    expect(users).to.have.lengthOf(0); // Consultar cuantos usuarios hay
  });

  // Segundo caso: obtengo un usuario segun su id
  it('Obtener un usuario dado su id mediante el metodo GET', async () => {
    const user = await userModel.findById('660f299443e38a095b3d3f89');

    expect(user).to.have.property('_id');
  });

  // Tercer caso: crear un nuevo usuario
  it('Crear un usuario mediante el metodo POST', async () => {
    const newUser = {
      first_name: 'Micaela',
      last_name: 'Nounou',
      email: 'nounoumicaela@hotmail.com.ar',
      password: 'alAlbaSM',
      age: 37,
    };

    const userCreated = await userModel.create(newUser);

    expect(userCreated).to.have.property('_id');
  });

  // Cuarto caso: Actualizar datos de un usuario
  it('Actualizar un usuario dado un id como parametro mediante el metodo PUT', async () => {
    const updateUser = {
      first_name: 'Valeria',
      last_name: 'Nounou',
      email: 'nounouvaleria@gmail.com',
      password: 'alAlba',
      age: 40,
    };

    const userUpdate = await userModel.findByIdAndUpdate(
      '669ad950a68a08d8c7c8d523',
      updateUser
    );

    expect(userUpdate).to.have.property('_id');
  });

  // Quinto caso: Eliminar un usuario
  it('Eliminar un usuario dado un id como parametro mediante el metodo DELETE', async () => {
    const rta = await userModel.findByIdAndDelete('660f299443e38a095b3d3f89');

    expect(rta).to.be.ok;
  });
});
