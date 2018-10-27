const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: "El nombre es obligatorio"
    },
    last_name: {
      type: String,
      required: "El apellido es obligatorio"
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    profile_pic: String,
    services: [String],
    role: {
      type: String,
      enum: ["ADMIN", "MEMBER", "CLIENT"],
      default: "CLIENT"
    },
    raiting: Number /*,
    documents: [String]*/
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("Member", userSchema);
