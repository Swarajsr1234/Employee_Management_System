const db = require('../config/db');

//this function is for fetching all the users along with their employee data 
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

//this function is for the admin who will manage all the internal feilds for the employee like assigning the manager selecting the department and designation..
const createOrUpdateEmployee = async (req , res) => {
    const {
      user_id,
      department,
      designation,
      manager_id = null,
      profile_pic = null,
      resume = null
    } = req.body;

    if(!user_id || !department || !designation)
    {
      return res.status(400).json({message : "user_id , department , designation feilds required.."});
    }

    try {
      const [userRows] = await db.query('select id from users where id = ?' , [user_id]);
      if(userRows.length === 0)
      {
        return res.status(400).json({message:"user_id does not exist."});
      }

      const[managerRows] = await db.query('select id from users where id = ? AND role IN(? , ?)' , [manager_id , 'admin' , 'manager']);
      if(managerRows.length === 0)
      {
        return res.status(500).json({message : "manager_id does not exist"});
      }

      const[empRows] = await db.query('select id from employee where user_id = ? ' , [user_id]);

      if(empRows.length > 0)
      {
        const updatesql = `UPDATE employee SET department = ? , designation = ? , manager_id = ? , profile_pic = ? , resume = ? WHERE user_id = ?`;
        await db.query(updatesql , [department , designation , manager_id , profile_pic , resume , user_id]);
        return res.status(200).json({message : "Employee updated Successfully.."});
      }else{
        const insertsql = `insert into employee (user_id , department , designation , manager_id , profile_pic , resume) values(? , ? , ? , ? , ? , ?)`;
        await db.query(insertsql ,[user_id , department , designation , manager_id , profile_pic , resume]);
        return res.status(201).json({message : "Employee inserted successfully in employee table"});
      }

    } catch (error) {
      console.log(error);
      return res.status(500).json({message : "Database Error"})
    }
}

module.exports = { getAllUsers , createOrUpdateEmployee };