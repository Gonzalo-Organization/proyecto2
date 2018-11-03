const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  addressee: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  comment: String,
  answers: [String],
  images: [String]
});

module.exports = mongoose.model("Message", messageSchema);
