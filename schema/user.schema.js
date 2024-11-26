const {Schema, model} = require("mongoose")


const userSchemas = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
    min: 8,
    max: 13,
  },
  image: String
},{
  versionKey: false,
})

const UserSchema = model("User", userSchemas)

module.exports = UserSchema