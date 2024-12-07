import dotenv from "dotenv";
dotenv.config();

import User from "../models/Users.js";
import bcrypt from "bcrypt";

export default class UserController {
  static async getAllUser(userID) {
    try {
      return await User.login({ _id: { $ne: userID } });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async login({ username: name, password: pass }) {    
    Vadilation.username(name);
    Vadilation.passsword(pass);
    
    const user = await User.findOne({ $or: [{ username: name }, { email: name }] });
    if(!user) {
      throw new Error('El usuario no existe');
    }

    const isValid = await bcrypt.compare(pass, user.password);
    if(!isValid){
      throw new Error('La contraseña es invalida');
    }

    const {password:__, ...publicUser} = user;

    return publicUser;
  }

  static async createUser({ username, email, password }) {
      Vadilation.username(username);
      Vadilation.email(email);
      Vadilation.passsword(password);

      const user = new User();
      user.username = username;
      user.email = email;
      user.password = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS, 10)
      );

      const saveUser = await user.save();

      const {password:__, ...publicUser } = user;

      return publicUser;
  }
}


class Vadilation {
  static username(username){
    if (typeof username !== "string" || username.length < 3)
      throw new Error("El usuario debe tener al menos 3 caracteres.");
  }

  static passsword(password){
    if (typeof password !== "string" || password.length < 8)
      throw new Error("La contraseña debe ser mayor a 8 caracteres.");
  }

  static email(email){
    if (typeof email !== "string" || !this.#isValidEmail(email))
      throw new Error("El email no es valido.");
  }

  static #isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}