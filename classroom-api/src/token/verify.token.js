const jwt = require("jsonwebtoken");
const config = require("../jwt.config");

function verifyToken(req, res, next) {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({ auth: false, message: "Sin token" });
    }
    const decoded = jwt.verify(token, config.secret);
    // console.log({ decoded });
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = verifyToken;
