const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quoteSchema = new Schema(
  {
    price: Number,
    comment: String,
    user_create: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    problem: {
      type: Schema.Types.ObjectId,
      ref: "Problem"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Quote", quoteSchema);
