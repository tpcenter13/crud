const mysql = require('mysql');
 
const db = mysql.createConnection({
  host: 'localhost', // XAMPP default
  user: 'root',      // Default user
  password: '',      // No password (unless set)
  database: 'nodeexpressdb', // Replace with your actual DB name
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