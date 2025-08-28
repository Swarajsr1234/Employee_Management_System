const express = require('express');
const router = express.Router();

const {createEmployee} = require('../controllers/adminController');

const{ protect , isAdmin} = require('../middleware/authMiddleware');

router.post("/" , protect , isAdmin , createEmployee);

module.exports = router;
