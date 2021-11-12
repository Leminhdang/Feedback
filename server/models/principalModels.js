const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const principalSchema = new Schema({
  id: { type: ObjectId },
  username: { type: String, unique: true },
  password: { type: String },
  fullname: { type: String },
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  role: { type: String },
});
module.exports = mongoose.model("Principal", principalSchema);
