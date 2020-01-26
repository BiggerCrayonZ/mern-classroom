const ex = require("express");
const router = ex.Router();
/* Fs */
const fs = require("fs");
// Multer
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const before = file.originalname.split('.');
    const path = `./src/data/${before[before.length - 1]}`;
    fs.exists(path, (exists) => {
      if (exists) cb(null, `./src/data/${before[before.length - 1]}`);
      else {
        fs.mkdir(path, (err) => {
          if (err) cb('Error al crear directorio para archivo', false);
          else cb(null, `./src/data/${before[before.length - 1]}`);
        })
      }
    })
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log({ file });
    if (
      file.mimetype === 'text/csv'
      || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      cb(null, true);
    } else {
      cb('Tipo de archivo incorrecto', false);
    }
  }
}).single('file');

// Activity
const Activity = require("../models/activity");
const activityController = require("../controllers/activity.controller");
// Token
const verifyToken = require("../token/verify.token");

router.get("/", verifyToken, async (req, res) => {
  const search = req.query.search || "";
  const filter = req.query.filter ? req.query.filter.split(",") : [];
  const sort = req.query.sort ? req.query.sort.split(",") : [];
  const controller = new activityController();
  controller
    .getAll(search, filter, sort)
    .then(response => res.status(200).json(response))
    .catch(err => res.status(err.status).json(err));
});

router.get("/:id", verifyToken, async (req, res) => {
  const controller = new activityController();
  controller
    .getById(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(err => res.status(err.status).json(err));
});

router.post("/params", verifyToken, async (req, res) => {
  const controller = new activityController();
  controller
    .getByParams({ ...req.body })
    .then(response => res.status(200).json(response))
    .catch(err => res.status(err.status).json({ ...err }));
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const controller = new activityController();
    controller
      .create(req.body)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(err.status).json(err);
      });
  } catch (err) {
    res.status(500).json({ activityErr: { ...err } });
  }
});

router.post("/bulk", verifyToken, async (req, res) => {
  try {
    const controller = new activityController();
    controller
      .bulk(req.body)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(err.status).json(err);
      });
  } catch (err) {
    res.status(500).json({ activityErr: { ...err } });
  }
});

router.post("/file", verifyToken, (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ activityErr: err, type: 'multer' });
    } else if (err) {
      res.status(400).json({ activityErr: err, type: 'unknown' });
    } else {
      try {
        console.log({ ...req.body });
        const controller = new activityController();
        controller
          .file(req.file.path)
          .then(result => res.status(200).json(result))
          .catch(err => res.status(500).json({ activityErr: { ...err } }));
      } catch (err) {
        res.status(500).json({ activityErr: { ...err } });
      }
    }
  });
});

router.put("/:id", verifyToken, async (req, res) => {
  const {
    title,
    subTitle,
    desc,
    primaryLocation,
    secondaryLocation
  } = req.body;
  const newActivity = {
    title,
    subTitle,
    desc,
    primaryLocation,
    secondaryLocation
  };
  await Activity.findByIdAndUpdate(req.params.id, newActivity);
  res.json({ status: "success", newActivity });
});

router.delete("/empty", verifyToken, async (req, res) => {
  try {
    const controller = new activityController();
    controller
      .emptyCollection()
      .then(result => res.status(200).json(result))
      .catch(err => res.status(err.status).json(err));
  } catch (err) {
    res.status(500).json({ activityErr: { ...err } });
  }
});

module.exports = router;
