const ex = require("express");
const router = ex.Router();
const User = require("../models/user");
const userController = require("../controllers/user.controller");

const verifyToken = require("../token/verify.token");
const verifyTokenAdmin = require("../token/verify.token.admin");

router.get("/", verifyTokenAdmin, async (req, res) => {
  const id = req.query.id;
  if (id) {
    const controller = new userController();
    controller
      .getById(id)
      .then(response => res.status(200).json(response))
      .catch(err => res.status(err.status).json(err));
  } else {
    const search = req.query.search || "";
    const filter = req.query.filter ? req.query.filter.split(",") : [];
    const sort = req.query.sort ? req.query.sort.split(",") : [];
    const controller = new userController();
    controller
      .getAll(search, filter, sort)
      .then(response => res.status(200).json(response))
      .catch(err => res.status(err.status).json(err));
  }
});

router.put("/", verifyTokenAdmin, async (req, res) => {
  const id = req.query.id;
  if (id) {
    const editUser = { ...req.body };
    if (Object.keys(editUser).length > 0) {
      await User.findByIdAndUpdate(id, editUser);
      res.status(200).json({ message: "Actualizado", success: true });
    } else
      res.status(422).json({
        success: false,
        message: "Ningun dato por editar"
      });
  } else
    res.status(422).json({
      success: false,
      message: "Necesitamos id para la edición"
    });
});

router.delete("/", verifyTokenAdmin, async (req, res) => {
  const id = req.query.id;
  if (id) {
    User.findByIdAndDelete(id)
      .then(() =>
        res.status(200).json({
          success: true,
          message: `Usuario: ${id} eliminado`
        })
      )
      .catch(err => res.status(500).json(err));
  } else
    res.status(422).json({
      success: false,
      message: "Id requerido"
    });
});

module.exports = router;
