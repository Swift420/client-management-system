const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  clientCode: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  linkedContacts: [],
});

module.exports = mongoose.model("Client", clientSchema);
