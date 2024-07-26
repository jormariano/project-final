import mongoose from 'mongoose';
import { userModel } from '../src/models/user.js';
import Assert from 'assert';
import varenv from '../src/dotenv.js';

const assert = Assert.strict;

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

    assert.strictEqual(Array.isArray(users), true);
  });

  // Segundo caso: obtengo un usuario segun su id
  it('Obtener un usuario dado su id mediante el metodo GET', async () => {
    const user = await userModel.findById('660f299443e38a095b3d3f89');

    console.log(user);

    // assert.strictEqual(typeof user, 'object');

    // Que me devuelva el objeto creado en MongoDB, ya que si existe tiene el id
    assert.ok(user._id);
  });

  // Tercer caso: crear un nuevo usuario
  it('Crear un usuario mediante el metodo POST', async () => {
    const newUser = {
      first_name: 'Valeria',
      last_name: 'Nounou',
      email: 'nounouvaleria@gmail.com',
      password: 'alAlbaSM',
      age: 37,
    };

    const userCreated = await userModel.create(newUser);

    assert.ok(userCreated._id);
  });

  // Cuarto caso:
  it('Actualizar un usuario dado un id como parametro mediante el metodo PUT', async () => {
    const updateUser = {
      first_name: 'Ines',
      last_name: 'Bras Santillan',
      email: 'luciabras@gmail.com',
      password: 'alAlba',
      age: 36,
    };

    const userUpdate = await userModel.findByIdAndUpdate(
      '6691916c6912ad250f4f5628',
      updateUser
    );

    assert.ok(userUpdate._id);
  });

  //Quinto caso:
  it('Eliminar un usuario dado un id como parametro mediante el metodo DELETE', async () => {
    const rta = await userModel.findByIdAndDelete('6691916c6912ad250f4f5628');

    assert.strictEqual(typeof rta, 'object');
  });
});
