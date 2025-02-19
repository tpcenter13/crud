const mysql = require('mysql');
require('dotenv').config
 
const db = mysql.createConnection({
  host: process.env.HOST , // XAMPP default
  user: process.env.USER,      // Default user
  password: process.env.PASSWORD,      // No password (unless set)
  database: process.env.DATABASE, // Replace with your actual DB name
});
 
// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL (XAMPP)');
  }
});
 
module.exports = db;