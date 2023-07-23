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
  const { name, description, linkedContacts, clientCode } = req.body;

  try {
    const updatedClient = await clientModel.findOneAndUpdate(
      { clientCode: clientCode },
      { name, description, linkedContacts },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ error: "Client not found." });
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the client." });
  }
};
