const bcrypt = require('bcrypt');
const db = require('../config/db');


const register = async (req , res)=>{
    try {
        const {name , email, password } = req.body;

        const [existingUser] = await db.query("SELECT * FROM USERS WHERE email = ?" , [email]);

        if(existingUser.length > 0)
        {
            return res.status(400).json({message : "User already Exist"});
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        await db.query("INSERT INTO USERS (name , email , password) values (? , ? , ?)",[
            name , email , hashedPassword
        ]);

        res.status(200).json({message:"User Register Seccefully."});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
}

module.exports = { register };