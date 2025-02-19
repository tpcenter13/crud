const mysql = require('mysql2'); // Use mysql2 for better performance
require('dotenv').config(); // Load environment variables

const db = mysql.createConnection({
  host: process.env.DB_HOST,   // Clever Cloud host
  user: process.env.DB_USER,   // Clever Cloud username
  password: process.env.DB_PASS, // Clever Cloud password
  database: process.env.DB_NAME, // Clever Cloud database name
  port: 3306,                  // Default MySQL port
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to Clever Cloud MySQL');
  }
});

module.exports = db;
