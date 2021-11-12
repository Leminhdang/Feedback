const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const criteriaSchema = new Schema({
  id: { type: ObjectId },
  criteria_name: { type: String },
  role: { type: String },
});
module.exports = mongoose.model("Criteria", criteriaSchema);
