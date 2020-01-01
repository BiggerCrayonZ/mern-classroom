const ex = require("express");
const router = ex.Router();
const userController = require("../controllers/user.controller");

const jwt = require("jsonwebtoken");
const config = require("../jwt.config");

const verifyToken = require("../token/verify.token");

router.post("/signup", (req, res, next) => {
  const controller = new userController();
  controller
    .signUp(req.body)
    .then(result => res.json({ ...result }))
    .catch(() => res.json({ ok: "no" }));
});

router.get("/me", verifyToken, (req, res, next) => {
  const controller = new userController();
  controller
    .findForLogin(req.userId)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.log({ err });
      res.status(err.status).json(err);
    });
});

router.post("/signin", (req, res, next) => {
  const controller = new userController();
  const body = { ...req.body };
  controller
    .login(body)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json(err));
});

module.exports = router;
