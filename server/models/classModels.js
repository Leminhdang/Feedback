const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const classSchema = new Schema({
  id: { type: ObjectId },
  class_name: { type: String, unique: true },
});
module.exports = mongoose.model("Classes", classSchema);
