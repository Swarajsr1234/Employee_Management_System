const db = require('../config/db');

const getAllUsers = async (req , res) => {

  try {
    const sql = `
    select u.id AS user_id,
    u.name ,
    u.email ,
    u.role ,
    e.id AS employee_id ,
    e.department , 
    e.designation , 
    e.manager_id , 
    e.profile_pic , 
    e.resume
    from users u 
    left join employee e on u.id = e.user_id
    order by u.id ASC 
    `;
    const [rows] = await db.query(sql);
    res.status(200).json(rows);

  } catch (error) {
    console.log(error);
    res.status(500).json({message : "Database Server error"});
  }
}

module.exports = { getAllUsers };