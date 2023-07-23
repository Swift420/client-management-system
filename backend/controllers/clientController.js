const clientModel = require("../models/clientModel");
const { generateAlphaCode, generateNumericCode } = require("../utils/codeGen");

module.exports.getAllClients = async (req, res) => {
  const clients = await clientModel.find();
  res.send(clients);
};

// module.exports.createClient = async (req, res) => {
//   const client = req.body;
//   console.log(client);
//   await clientModel.create(client).then((data) => {
//     console.log("Saved Successfully");
//     res.status(201).send(data);
//   });
// };

module.exports.createClient = async (req, res) => {
  const { name, description, linkedContacts } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Client name is required." });
  }

  try {
    let numericPart = 1;
    let clientCode = "";

    while (true) {
      const alphaPart = generateAlphaCode(name);
      const numericPartCode = generateNumericCode(numericPart);
      clientCode = alphaPart + numericPartCode;

      const clientExists = await clientModel.findOne({ clientCode });

      if (!clientExists) {
        // Add the client code to the client object
        const client = { name, description, clientCode, linkedContacts };
        const savedClient = await clientModel.create(client);

        console.log("Saved Successfully");
        return res.status(201).json(savedClient);
      }

      numericPart++;
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the client code." });
  }
};

module.exports.updateClient = async (req, res) => {
  const { clientCode } = req.params;

  try {
    const clientToUpdate = await Client.findOne({ clientCode });
    if (!clientToUpdate) {
      return res.status(404).json({ error: "Client not found." });
    }

    // Update the client data with the new data received in the request body
    const updatedData = req.body;
    clientToUpdate.set(updatedData);

    const updatedClient = await clientToUpdate.save();
    res.json(updatedClient);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the client." });
  }
};
