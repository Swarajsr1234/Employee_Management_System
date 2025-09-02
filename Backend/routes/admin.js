const express = require('express');
const router = express.Router();
const { getAllUsers , createOrUpdateEmployee} = require('../controllers/adminController');

const{ protect , isAdmin} = require('../middleware/authMiddleware');

router.get('/users' , protect ,isAdmin , getAllUsers);
router.post('/employee' , protect , isAdmin , createOrUpdateEmployee);

module.exports = router;
