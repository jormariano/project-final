import passport from 'passport';

export const login = async (req, res) => {
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
};

export const register = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send('Usuario ya existe en la aplicacion');
    }
    res.status(200).send('Usuario creado correctamente');
  } catch (e) {
    res.status(500).send('Error al registrar usuario');
  }
};

export const sessionGithub = async (req, res) => {
  console.log(req);
  req.session.user = {
    email: req.user.email,
    first_name: req.user.name,
  };
  res.redirect('/');
};

export const testJWT = async (req, res) => {
  console.log('Desde testJWT' + req.user);
  if (req.user.rol == 'User') {
    res.status(403).send('Usuario no autorizado');
  } else {
    res.status(200).send(req.user);
  }
};

export const logout = async (req, res) => {
  req.session.destroy(function (e) {
    if (e) {
      console.log(e);
    } else {
      res.status(200).redirect('/');
    }
  });
};
