import { Router } from 'express';
import passport from 'passport';

const sessionRouter = Router();

// Loguear un usuario ya registrado. El req viene desde Passport
sessionRouter.get(
  '/login',
  passport.authenticate('login'),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).send('Usuario o contrasenia no validos');
      }
      req.session.user = {
        email: req.user.email,
        first_name: req.user.first_name,
      };
      res.status(200).send('Usuario logueado con exito');
    } catch (e) {
      res.status(500).send('Error al loguear usuario');
    }
  }
);

// Registrar un usuario, que viene desde Passport
sessionRouter.post(
  '/register',
  passport.authenticate('register'),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(400).send('Usuario ya existe en la aplicacion');
      }
      res.status(200).send('Usuario creado correctamente');
    } catch (e) {
      res.status(500).send('Error al registrar usuario');
    }
  }
);

// Registrar un usuario con estrategia de terceros: GitHub
sessionRouter.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  async (req, res) => {
    r;
  }
);

sessionRouter.get(
  '/githubSession',
  passport.authenticate('github'),
  async (req, res) => {
    console.log(req);
    req.session.user = {
      email: req.user.email,
      first_name: req.user.name,
    };
    res.redirect('/');
  }
);

sessionRouter.get('/logout', (req, res) => {
  req.session.destroy(function (e) {
    if (e) {
      console.log(e);
    } else {
      res.status(200).redirect('/');
    }
  });
});

// Iniciar sesion utilizando la estrategie de JWT
sessionRouter.get(
  '/testJWT',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.status(200).send(req.user);
  }
);

export default sessionRouter;
