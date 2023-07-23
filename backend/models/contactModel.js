const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  linkedClients: [],
});

module.exports = mongoose.model("Contact", contactSchema);
