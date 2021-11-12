const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var classes = require("../models/classModels");
var teacher = require("../models/teacherModels");
var student = require("../models/studentModels");
var subject = require("../models/subjectModels");

const feedbackSchema = new Schema({
  id: { type: ObjectId },
  id_creator: { type: ObjectId },
  id_teacher: { type: Schema.Types.ObjectId, ref: "Teacher" },
  id_class: { type: Schema.Types.ObjectId, ref: "Classes" },
  id_student: { type: String },
  date_created: { type: Date },
  id_subject: { type: Schema.Types.ObjectId, ref: "Subject" },
  list_criteria: { type: Array },
  note: { type: String },
  role_criteria: { type: String },
  status: { type: Boolean },
  disabled: { type: Boolean },
});
module.exports = mongoose.model("Feedback", feedbackSchema);
