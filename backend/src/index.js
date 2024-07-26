/*
 Paso 1: npm init --yes
 Paso 2: "type": "module",
 Paso 3: crear carpetas src y dentro config, data y rutes
 Paso 4: npm i express
 Paso 5: agregar en las dependencias del package.json:
   "scripts": {
       "dev": "node --watch src/index.js"
     },
  Agregando en scripts, en la terminal: npm run dev

 Paso 6: crear .gitignore y agregar node_modules
*/

/* Saber cuantos procesadores tengo:
import { cpus } from 'os';
console.log(cpus().length);
*/

// Express para creacion del servidor
import express from 'express';
import mongoose from 'mongoose';
import { __dirname } from './path.js';
import { Server } from 'socket.io';
import messageModel from './models/messages.js';
import indexRouter from './routes/indexRouter.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import initializePassport from './config/passport/passport.js';
import passport from 'passport';
import varenv from './dotenv.js';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import { addLogger } from './utils/logger.js';

// Configuraciones
const app = express();
const PORT = 8000;

// CORS - Permite todas las rutas de ejecucion
// app.use(cors());

// CORS - Permite solo las rutas autorizadas para ejecutar el codigo
const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  // El metodo GET es para todo, no se puede restringir
  methods: ['GET', 'POST', 'UPDATE', 'DELETE'],
};

app.use(cors(corsOptions));

// Server
const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
const io = new Server(server);

// Connection Data Base
mongoose
  .connect(varenv.mongo_url)
  .then(() => console.log('DB is connected'))
  .catch((e) => console.log(e));

// Documentacion de la app
const swaggerOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Documentación de mi aplicación ',
      description: 'Descripción de documentación',
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);

// Middlewares: intermediario que se ejecuta antes de llegar al endpoint. Express no trabaja con json y usa un middleware
app.use(express.json());
app.use(
  session({
    secret: varenv.session_secret,
    resave: true,
    store: MongoStore.create({
      mongoUrl: varenv.mongo_url,
      // tiempo de vida de la sesion en segundos, podes poner 60*60 o 10000:
      ttl: 60 * 60,
    }),
    saveUninitialized: true,
  })
);
app.use(cookieParser(varenv.cookies_secret));
app.use(addLogger);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// Prueba de logger:
app.get('/', (req, res) => {
  res.logger.warning('ESTO ES UN WARNING');
  res.send('Hola');
});

// Passport: Sesiones y su inicio
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', indexRouter);

// Routes Cookies
// Crear/Guardar una cookie
app.get('/setCookie', (req, res) => {
  res
    .cookie('CookieCookie', 'Esto es una cookie', {
      // atributo con fecha de expiracion
      maxAge: 30000,
      // atributo para cookie firmada
      signed: true,
    })
    .send('Cookie creada');
});
// Obtener una cookie y responder solo con las cookies firmadas (no modificadas)
app.get('/getCookie', (req, res) => {
  res.send(req.signedCookies);
});
// Eliminar una cookie
app.get('/deleteCookie', (req, res) => {
  res.clearCookie('CookieCookie').send('Cookie eliminada');
});

// Session Routes
// Guardo sesiones de mi usuario
app.get('/session', (req, res) => {
  console.log(req.session);

  if (req.session.counter) {
    req.session.counter++;
    res.send(`Sos el usuario Nº ${req.session.counter} en ingresar a la web`);
  } else {
    req.session.counter = 1;
    res.send('Sos el primer usuario que ingresa a la web');
  }
});

// Logear a los usuarios
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // simulamos la consulta a una DB
  if (email == 'admin@gmail.com' && password == '1234') {
    req.session.email = email;
    req.session.password = password;
    console.log(req.session);
  }
  res.send('Login valido');
});

// Los mensajes vienen de la base de datos
io.on('connection', (socket) => {
  console.log('Conexion con socket.io');

  socket.on('message', async (message) => {
    try {
      await messageModel.create(message);

      const messages = await messageModel.find();

      io.emit('messageLogs', messages);
    } catch (error) {
      io.emit('messageLogs', error);
    }
  });
});

/* En main.js Se establece la conexion entre el cliente y servidor. 

io.on('connection', (socket) => {
  console.log('Conexion con socket.io');

  socket.on('buy', (info) => {
    // El cliente envia un mensaje
    console.log(info);
  });

  socket.on('finish', (info) => {
    console.log(info);
    socket.emit('message-client', 'Compra finalizada con exito'); // Este mensaje se envia al cliente (inspeccionar clg)
    socket.broadcast.emit('buy-finish', 'Supervisora se completo una venta'); // Se envia al resto de conexiones realizadas con el server
  });
});

*/

// .on es para recibir y .emit es para enviar

/* 
CRUD: Create, Read, Update, Delete
METODOS: Post, Get, Put, Delete
GET es para obtener, POST es para crear, PUT para actualizar. Con GET y POST se debe enviar informacion.
POSTMAN es para simular peticiones con los metodos, es para testear rutas, sin necesidad de tener un formulario en Frontend.

CLASE 10 WEBSOCKETS

*/
