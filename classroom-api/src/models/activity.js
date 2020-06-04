const mong = require("mongoose");
const { Schema } = mong;

const activitySchema = new Schema({
  title: { type: [String], required: true, text: true },
  subTitle: { type: [String], text: true },
  desc: { type: [String] },
  date: { type: Date, default: Date.now },
  primaryLocation: { type: [String], required: true, text: true },
  secondaryLocation: { type: [String], text: true },
  startHour: { type: Number, required: true },
  duration: { type: Number },
});

activitySchema.index({
  title: 'text',
  subTitle: 'text',
  primaryLocation: 'text',
  secondaryLocation: 'text',
});

module.exports = mong.model("Activity", activitySchema);
