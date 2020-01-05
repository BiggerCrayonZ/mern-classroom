const Role = require("../models/role");

class RoleController {
    getAll = () =>
    new Promise(async (resolve, reject) => {
      try {
        const roles = await Role.find();
        resolve(roles);
      } catch (err) {
        reject({ status: 500, err });
      }
    });
}

module.exports = RoleController;