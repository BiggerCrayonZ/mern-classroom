const mong = require("mongoose");
const { Schema } = mong;

const activitySchema = new Schema({
  title: { type: String, required: true },
  subTitle: { type: String },
  desc: { type: String },
  date: { type: Date, default: Date.now },
  primaryLocation: { type: String, required: true },
  secondaryLocation: { type: String },
  startHour: { type: Number, required: true },
  duration: { type: Number },
});

activitySchema.index({ '$**': 'text' });

module.exports = mong.model("Activity", activitySchema);
