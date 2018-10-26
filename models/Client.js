const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = ({
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
  profile_pic: String,
  raiting: Number,
  payment: {
    type: Number,
    required: true
  }
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

clientSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("Client", clientSchema);
