const contactModel = require("../models/contactModel");

module.exports.getAllContacts = async (req, res) => {
  const contact = await contactModel.find();
  res.send(contact);
};

module.exports.createContact = async (req, res) => {
  const contact = req.body;
  console.log(contact);
  await contactModel.create(contact).then((data) => {
    console.log("Saved Successfully");
    res.status(201).send(data);
  });
};
