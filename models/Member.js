const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = ({
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
  address: {
    type: String,
    required: true
  },
  services: [String],
  profile_pic: String,
  raiting: Number
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

memberSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("Member", memberSchema);
