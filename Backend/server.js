const express = require('express')
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const app = express();
const cors = require('cors');

dotenv.config();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // your Vite frontend
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})