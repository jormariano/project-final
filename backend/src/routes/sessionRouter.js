import { Router } from 'express';
import passport from 'passport';
import {
  login,
  register,
  sessionGithub,
  testJWT,
  logout,
} from '../controllers/sessionController.js';

const sessionRouter = Router();

// Loguear un usuario ya registrado. El req viene desde Passport
sessionRouter.get('/login', passport.authenticate('login'), login);

// Registrar un usuario, que viene desde Passport
sessionRouter.post('/register', passport.authenticate('register'), register);

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
  sessionGithub
);

sessionRouter.get('/current', passport.authenticate('jwt'), (req, res) => {
  console.log(req);
  res.status(200).send('Usuario logueado');
});

sessionRouter.get('/logout', logout);

// Iniciar sesion utilizando la estrategie de JWT
sessionRouter.get(
  '/testJWT',
  passport.authenticate('jwt', { session: false }),
  testJWT
);

export default sessionRouter;
