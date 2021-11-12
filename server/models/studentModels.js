const mongoose = require("mongoose");
var classes = require("../models/classModels");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const managerSchema = new Schema({
  id: { type: ObjectId },
  student_id: { type: String, unique: true },
  password: { type: String },
  fullname: { type: String },
  date_of_birth: { type: Date, default: null },
  gender: { type: String, default: "" },
  role: { type: String },
  class_id: { type: Schema.Types.ObjectId, ref: "Classes", default: null },
});
module.exports = mongoose.model("Student", managerSchema);
