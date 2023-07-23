const express = require("express");
const {
  getAllClients,
  createClient,
  getClientByCode,
  updateClient,
} = require("../controllers/clientController");
const router = express.Router();

router.get("/", getAllClients);
// router.get("/singleclient", getClientByCode);
router.post("/addclient", createClient);
router.post("/updateclient", updateClient);

module.exports = router;
