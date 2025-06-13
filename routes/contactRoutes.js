const express = require("express");
const router = express.Router();
const { getContacts, createContact, updateContact, deleteContact, getContact } = require("../controllers/contactController");
const validatToken = require("../middleware/validatToken");



console.log("Contact routes loaded------->>");

router.use(validatToken); // Apply token validation middleware to all routes in this file
router.route("/").get(getContacts).post(createContact);

router.route("/:id").put(updateContact).delete(deleteContact).get(getContact);


module.exports = router;

