import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  /*
        1°: Objeto de asociacion del token (Usuario)
        2°: Clave privada del cifrado (tiene que ser la misma contrasenia)
        3°: Tiempo de expiracion del token
        * Solo recibe token de su propio Backend, tiene que ser identicos y lo saben por la contrasenia de encriptacion.
  */
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  return token;
};

console.log(
  generateToken({
    _id: '660f367f710c920f3792a3f8',
    first_name: 'Jor',
    last_name: 'Soles',
    age: 30,
    email: 'solesjor@coder.com',
    password: '$2b$12$OYcR6rO4Uy1fso7XzGs9Cuz/03Gu6UAkbMIFqovJxtLMY1oeZFdQy',
    rol: 'User',
    __v: 0,
  })
);
