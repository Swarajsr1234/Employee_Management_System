const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/adminController');

const{ protect , isAdmin} = require('../middleware/authMiddleware');

router.get('/users' , protect ,isAdmin , getAllUsers);

module.exports = router;
