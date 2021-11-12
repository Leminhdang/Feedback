const mongoose = require("mongoose");
var subject = require("../models/subjectModels");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const managerSchema = new Schema({
  id: { type: ObjectId },
  teacher_id: { type: String, unique: true },
  password: { type: String },
  email: { type: String },
  fullname: { type: String },
  date_of_birth: { type: Date },
  gender: { type: String },
  formteacher: { type: Schema.Types.ObjectId, ref: "Classes", default: null },
  subject_id: { type: Schema.Types.ObjectId, ref: "Subject" },
  role: { type: String },
});
module.exports = mongoose.model("Teacher", managerSchema);
