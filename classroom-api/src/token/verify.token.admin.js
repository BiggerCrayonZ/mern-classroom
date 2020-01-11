const jwt = require("jsonwebtoken");
const config = require("../jwt.config");

function verifyToken(req, res, next) {
    try {
        const token = req.headers["x-access-token"];
        if (!token) {
            return res.status(401).json({ auth: false, message: "Sin token" });
        }
        const decoded = jwt.verify(token, config.secret);
        req.userId = decoded.id;
        if (decoded.role === 'Admin') {
            req.role = decoded.role;
            next();
        } else {
            res.status(401).send({
                message: 'No cuenta con permisos de adminsitrador para acceder a este modulo.',
            })
        }
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = verifyToken;
