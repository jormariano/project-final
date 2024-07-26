import * as chai from 'chai';
import mongoose from 'mongoose';
import supertest from 'supertest';
import varenv from '../src/dotenv.js';
import { __dirname } from '../src/path.js';
import { describe, it } from 'mocha';

const expect = chai.expect;

// Conexion a la Base de datos
await mongoose
  .connect(varenv.mongo_url)
  .then(() => console.log('DB is connected'))
  .catch((e) => console.log(e));

const requester = supertest('http://localhost:8000');

const jwtToken = '';
describe(`Test CRUD de productos en la ruta api/products`, function () {
  // Comprueba todos los productos
  it(`Ruta: api/products metodo GET`, async () => {
    const { ok } = await requester.get('/api/products');
    expect(ok).to.be.ok;
  });

  // Crea un nuevo producto
  it(`Ruta: api/products metodo POST`, async () => {
    const newProduct = {
      title: 'Nuestra parte de noche',
      description: 'Libro de terror',
      stock: '25',
      category: 'Terror',
      code: '365465',
      price: '40.000',
    };

    const { statusCode } = await (await requester.post('/api/products'))
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(newProduct);

    expect(statusCode).to.be.equal(201);
  });
});
