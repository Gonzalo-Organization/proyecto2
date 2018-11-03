const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: "Campo de nombre es obligatorio"
    },
    last_name: {
      type: String,
      required: "Campo de apellido es obligatorio"
    },
    email: {
      type: String,
      unique: true,
      required: "Campo de email es obligatorio"
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE"]
      //required: "Campo de genero es obligatorio"
    },
    address: String,
    profile_pic: String,
    description: String,
    services: [String],
    raiting: Number,
    role: {
      type: String,
      enum: ["MEMBER", "CLIENT", "BOTH"],
      default: "CLIENT"
    },
    active: {
      type: Boolean,
      default: false
    }
    /*payment: {
      card: {
        type: String,
        enum: ["DEBITO", "CREDITO"],
        required: true
      },
      number: {
        type: Number,
        required: true
      },
      expires: {
        type: Number,
        required: true
      },
      cvv: {
        type: Number,
        required: true
      }
    },*/
    /*documents: [String]*/
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);
