const ex = require("express");
const router = ex.Router();
const Role = require("../models/role");
const roleController = require("../controllers/role.controller");
const verifyToken = require("../token/verify.token");

router.get("/", verifyToken, async (req, res) => {
    console.log({ req });
    const controller = new roleController();
    controller
      .getAll()
      .then(response => res.status(200).json(response))
      .catch(err => res.status(err.status).json(err));
  });

  module.exports = router;