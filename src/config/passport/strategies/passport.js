import local from 'passport-local';
import passport from 'passport';
import { userModel } from '../../../models/user.js';
import { createHash, validatePassword } from '../../../utils/bcrypt.js';

// Passport con Middleware
const localStrategy = local.Strategy;

const initializePassport = () => {
  // Definir en que rutas se aplican las estrategias

  // Crear el usuario
  passport.use(
    'register',
    new localStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
      },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email, password, age } = req.body;

          const findUser = await userModel.findOne({ email: email });
          if (findUser) {
            // No creo el usuario
            return done(null, false);
          } else {
            const user = await userModel.create({
              first_name: first_name,
              last_name: last_name,
              email: email,
              age: age,
              password: createHash(password),
            });

            // Creo el usuario
            return done(null, true);
          }
        } catch (e) {
          // Devuelve error
          return done(e);
        }
      }
    )
  );

  // Inicializar la sesion del usuario
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // Eliminar la sesion del usuario
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });

  // Loguear al usuario
  passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
      },
      async (username, password, done) => {
        try {
          // Busca el usuario en la DB
          const user = await userModel.findOne({ email: username }).lean();

          // Si usuario y contraseña existen, se devuelve el login iniciado
          if (user && validatePassword(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (e) {
          return done(e);
        }
      }
    )
  );
};

export default initializePassport;
