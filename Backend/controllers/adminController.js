const db = require('../config/db');

const getAllUsers = async (req , res) => {
  try {
    const [rows] = await db.query('select id , name , email , role from users');
    res.status(200).json(rows);

  } catch (error) {
    console.log(error);
    res.status(500).json({message : "Database Server error"});
  }
}

module.exports = { getAllUsers };