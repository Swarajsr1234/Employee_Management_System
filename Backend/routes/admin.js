const express = require('express');
const router = express.Router();
const { getAllUsers , createOrUpdateEmployee , deleteEmployee} = require('../controllers/adminController');

const{ protect , isAdmin} = require('../middleware/authMiddleware');

router.get('/users' , getAllUsers);
router.post('/employee' , createOrUpdateEmployee);
router.delete('/deleteEmp' , deleteEmployee);
module.exports = router;
