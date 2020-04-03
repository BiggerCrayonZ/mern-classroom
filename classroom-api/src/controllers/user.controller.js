const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../jwt.config");

const roleController = require("../controllers/role.controller");
const {
  normalizeFilter,
  normalizeSort,
  normalizeSearch,
} = require('../functions/user.function');
const expiredIn = 60 * 60 * 24;

class UserController {
  signUp = model =>
    new Promise(async (resolve, reject) => {
      if (model.role !== '') {
        const controller = new roleController();
        controller
          .getAll()
          .then(async response => {
            const exist = Boolean(response.map(x => x.name).some(x => x === model.role));
            if (exist) {
              const user = new User({ ...model });
              user.password = await user.encryptPassword(user.password);
              user
                .save()
                .then(() => {
                  const token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: expiredIn,
                  });
                  resolve({
                    status: "received",
                    username: user.username,
                    email: user.email,
                    token,
                    expiredIn,
                  });
                })
                .catch(err => reject({ status: 500, err }));
            } else {
              reject({
                status: 404,
                err: 'Role no existe',
              });
            }
          })
          .catch(err => reject({ status: 500, err }));
      } else {
        reject({
          status: 404,
          err: 'Role no definido',
        });
      }
    });

  findForLogin = id =>
    new Promise(async (resolve, reject) => {
      const user = await User.findById(id, { password: 0 });
      if (!user) {
        reject({ status: 404, message: "User not found" });
      } else {
        resolve({ status: 200, user });
      }
    });

  login = access =>
    new Promise(async (resolve, reject) => {
      console.log({ access });
      if (Object.keys(access).length === 2) {
        const { email, password } = access;
        const user = await User.findOne({ email });
        console.log({ user });
        if (!user) return reject({ status: 404, message: "Usuario no existe" });
        const pass = await user.validatePass(password);
        if (!pass) {
          return reject({
            status: 401,
            auth: false,
            token: null,
            message: "Acceso denegado"
          });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, config.secret, {
          expiresIn: expiredIn,
        });
        const userEdit = { ...user._doc, lastLogin: new Date() };
        await User.findByIdAndUpdate(user._id, userEdit)
        resolve({
          status: 200,
          auth: true,
          token,
          message: "Bienvenido",
          expiredIn,
          username: user.username,
          email: user.email,
          role: user.role,
          profile: user.profile,
        });
      } else {
        return reject({ status: 400, message: 'Usuario y/o contraseña vacios' });
      }
    });

  /* User Control */

  getAll = (search = '', filter = [], sort = []) =>
    new Promise(async (resolve, reject) => {
      try {
        const searchJson = normalizeSearch(search);
        const filterJson = normalizeFilter(filter);
        const sortJson = normalizeSort(sort);
        const users = await User
          .find(searchJson)
          .select(filterJson)
          .sort(sortJson);
        if (users.length > 0) {
          resolve(users);
        } else {
          reject({ status: 404, message: 'empty' });
        }
      } catch (err) {
        reject({ status: 500, err });
      }
    });

  getById = id =>
    new Promise(async (resolve, reject) => {
      try {
        const user = await User
          .findById(id)
          .select({
            username: 1,
            email: 1,
            role: 1,
            profile: 1,
          });
        if (user) resolve(user);
        else reject({ status: 404, err: `Usuario no encontrado` });
      } catch (err) {
        reject({ status: 500, err });
      }
    });
}

module.exports = UserController;
