const ex = require("express");
const router = ex.Router();
const Activity = require("../models/activity");
const activityController = require("../controllers/activity.controller");
const verifyToken = require("../token/verify.token");

router.get("/", verifyToken, async (req, res) => {
  const controller = new activityController();
  controller
    .getAll()
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
    .catch(err => res.status(err.status).json(err));
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
  res.json({ status: "updated", newActivity });
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const controller = new activityController();
    controller
      .delete(req.params.id)
      .then(result => res.status(200).json(result))
      .catch(err => res.status(err.status).json(err));
  } catch (err) {
    res.status(500).json({ activityErr: { ...err } });
  }
});

module.exports = router;
