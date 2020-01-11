const ex = require("express");
const router = ex.Router();
const userController = require("../controllers/user.controller");

const verifyToken = require("../token/verify.token");
const verifyTokenAdmin = require("../token/verify.token.admin");

router.get("/", verifyTokenAdmin, async (req, res) => {
  const search = req.query.search || '';
  const filter = req.query.filter ? req.query.filter.split(',') : [];
  const sort = req.query.sort ? req.query.sort.split(',') : [];
  console.log({ sort, filter });
  const controller = new userController();
  controller
    .getAll(search, filter, sort)
    .then(response => res.status(200).json(response))
    .catch(err => res.status(err.status).json(err));
});

router.get("/:id", verifyToken, async (req, res) => {
  const controller = new userController();
  controller
    .getById(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(err => res.status(err.status).json(err));
});

module.exports = router;
