const mongoose = require("mongoose")

const announSchemas = new mongoose.Schema ({
  spiker: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  tema: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  location: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  date: {
    type: String,
    required:true
  },
  user_info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
},{
  versionKey: false,
  timestamps: true,
})

const announcementSchema = mongoose.model("Announcement", announSchemas)
module.exports = announcementSchema