const express = require('express');
const router = express.Router();
const {
  createContact,
  getAllContacts,
} = require('../controllers/contactController');

router.route('/')
  .post(createContact)
  .get(getAllContacts);

module.exports = router;
