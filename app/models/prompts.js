const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema({
  //userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false }
  

});

module.exports = mongoose.model("Prompt", promptSchema);
