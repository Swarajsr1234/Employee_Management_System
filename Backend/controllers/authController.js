const bcrypt = require('bcrypt');
const db = require('../config/db');
const generateToken = require('../utils/generateToken');


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

        console.log("User Register Seccefully.");
        res.status(200).json({message:"User Register Seccefully."});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
}

const login = async ( req , res ) => {
    try {
        const { email , password } = req.body;

        const [user] = await db.query("SELECT * FROM USERS WHERE email = ? " , [email]);

        if(user.length == 0)
        {
           return res.status(400).json({message : "user does not exist.."});
        }

        const existingUser = user[0];

        const isMatch = await bcrypt.compare(password , existingUser.password );
        if(!isMatch)
        {
            return res.status(401).json({message : "Invalid username or password !"});
        }

        const token = generateToken(existingUser);
        console.log("login response send");

        return res.status(200).json({message : "Login successful 🚀" , token});


    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error"});
    }
}



module.exports = { register , login };