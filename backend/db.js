const mysql = require('mysql');
require('dotenv').config
 
const db = mysql.createConnection({
  host: 'bdnfyppmyhuekgygkgo5-mysql.services.clever-cloud.com', // XAMPP default
  user: 'uitesgrbdgredt2g',      // Default user
  password: 'y5TFAFvt5rcCsjowUjO1',      // No password (unless set)
  database: 'bdnfyppmyhuekgygkgo5', // Replace with your actual DB name
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