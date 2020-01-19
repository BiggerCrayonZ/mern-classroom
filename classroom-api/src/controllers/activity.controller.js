const fs = require("fs");
const csv = require("fast-csv");
const Activity = require("../models/activity");

class ActivityController {
  create = model =>
    new Promise((resolve, reject) => {
      const json = { ...model };
      json.date = new Date(json.date);
      const act = new Activity({ ...json });
      act
        .save()
        .then(() => resolve(act))
        .catch(err => reject({ status: 500, act, err }));
    });

  bulk = arr =>
    new Promise((resolve, reject) => {
      Activity.collection.insert(arr, (err, docs) => {
        if (err) {
          reject({ status: 500, err });
        } else {
          resolve({
            msg: "Acitivities were successfully stored",
            total: docs.length
          });
        }
      });
    });

  file = path =>
    new Promise((resolve, reject) => {
      let fileRows = [];
      try {
        console.log({ path });
        fs.createReadStream(path)
          .pipe(csv.parse())
          .on("error", error => console.error(error))
          .on("data", row => {
            console.log(`ROW=${JSON.stringify(row)}`);
            fileRows = [...fileRows, row];
          })
          .on("end", rowCount => {
            fs.unlinkSync(path);
            resolve({ rowCount, fileRows });
          });
      } catch (err) {
        console.log({ err });
        reject(err);
      }
    });

  getAll = () =>
    new Promise(async (resolve, reject) => {
      try {
        const acts = await Activity.find();
        resolve(acts);
      } catch (err) {
        reject({ status: 500, err });
      }
    });

  getById = id =>
    new Promise(async (resolve, reject) => {
      try {
        const act = await Activity.findById(id);
        if (act) {
          resolve(act);
        } else {
          reject({ status: 404, err: `Not found by id: ${id}` });
        }
      } catch (err) {
        reject({ status: 500, err });
      }
    });

  getByParams = params =>
    new Promise(async (resolve, reject) => {
      try {
        const acts = await Activity.find({ ...params });
        if (acts) {
          resolve(acts);
        } else {
          reject({ status: 404, err: `Not found by params: ${params}` });
        }
      } catch (err) {
        reject({ status: 500, err });
      }
    });

  delete = id =>
    new Promise(async (resolve, reject) => {
      try {
        Activity.findByIdAndRemove(id)
          .then(() => resolve({ status: "deleted", id }))
          .catch(err => {
            reject({ status: 500, err });
          });
      } catch (err) {
        reject({ status: 500, err });
      }
    });
}

module.exports = ActivityController;
