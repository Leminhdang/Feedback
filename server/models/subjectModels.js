const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const subjectSchema = new Schema({
  id: { type: ObjectId },
  subject_name: { type: String, unique: true },
});
module.exports = mongoose.model("Subject", subjectSchema);
