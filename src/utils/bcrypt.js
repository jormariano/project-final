import bcrypt from 'bcrypt';

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

const passwordE = createHash('jorgelinamariano');
console.log(passwordE);

export const validatePassword = (passwordSend, passwordBdd) =>
  bcrypt.compareSync(passwordSend, passwordBdd);
console.log(validatePassword('jorgelinamariano', passwordE));
