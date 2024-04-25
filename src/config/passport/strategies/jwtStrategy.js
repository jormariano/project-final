import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { userModel } from '../../../models/user.js';
import varenv from '../../../dotenv.js';

// Solo requerido por usar Postman
const cookieExtractor = (req) => {
  console.log(req.cookies);
  //{} no hay cookies != esta cookie no existe
  //Si existen cookies, asigno mi cookie en especifico
  const token = req.cookies ? req.cookies.jwtCookie : {};
  console.log(token);
  return token;
};

console.log(varenv.jwt_secret);

// Estrategia de JWT, consulto de las cookies
const jwtOptions = {
  // se consulta desde las cookies porque no tenemos un frontend
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),

  // de donde se extrae un token, del Bearer+Token = Token de JWT
  // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: varenv.jwt_secret,
};

export const strategyJWT = new JwtStrategy(
  jwtOptions,
  // payload es toda la info del usuario
  async (payload, done) => {
    try {
      console.log(payload);
      const user = await userModel.findById(payload.user._id);
      console.log(user);

      // usuario no existe
      if (!user) {
        return done(null, false);
      }

      // usuario si existe
      return done(null, user);
    } catch (e) {
      return done(e, null);
    }
  }
);
