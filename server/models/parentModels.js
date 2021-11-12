const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const managerSchema = new Schema({
  id: { type: ObjectId },
  parent_id: { type: String, unique: true },
  password: { type: String },
  fullname: { type: String },
  parent_phone: { type: String },
  role: { type: String },
});
module.exports = mongoose.model("Parent", managerSchema);
