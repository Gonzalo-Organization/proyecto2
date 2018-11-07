const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const problemSchema = new Schema(
  {
    title: String,
    description: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    quoteWin: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    quotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quote"
      }
    ],
    maxBudget: Number,
    accepted: {
      type: Boolean,
      default: false
    },
    images: [String]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Problem", problemSchema);
