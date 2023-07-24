const express = require("express");

const {
  getAllContacts,
  createContact,
  updateContact,
} = require("../controllers/contactController");
const contactrouter = express.Router();

contactrouter.get("/", getAllContacts);
contactrouter.post("/addcontact", createContact);
contactrouter.put("/updatecontact", updateContact);

module.exports = contactrouter;
