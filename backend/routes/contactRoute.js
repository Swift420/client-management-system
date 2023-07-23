const express = require("express");

const {
  getAllContacts,
  createContact,
} = require("../controllers/contactController");
const contactrouter = express.Router();

contactrouter.get("/", getAllContacts);
contactrouter.post("/addcontact", createContact);

module.exports = contactrouter;
