const mong = require("mongoose");
const { Schema } = mong;

const roleSchema = new Schema({
  name: { type: String, required: true },
  permissions: { type: Array },
});

module.exports = mong.model("Role", roleSchema);
