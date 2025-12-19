// connect to MySQL database
// table mysql_table

// first_name
// last_name
// email
// phone_number

const mysql = require('mysql2');

// created connection 
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',             // user root
  password: 'Pass1234',     // password MySQL
  database: 'clients_form'  // database name that I created in MySQL
});

// connects to MYSQL
connection.connect((error) => {
  if (error) {
    console.log('Error to connect to MySQL:', error);
  } else {
    console.log('MySQL connected!');
  }
});

// "MySQL" adding data:
// function to insert client data
// names from the "excel" teacher provide it. snake-case
function insertClient(client) {
  const sql = `
    INSERT INTO mysql_table
    (first_name,last_name,email,phone,eir_code)
    VALUES (?, ?, ?, ?, ?)
  `;
// (same) names from the "excel" teacher provide it. snake-case
  connection.query(sql, [
    client.first_name,
    client.last_name,
    client.email,
    client.phone,
    client.eir_code
  ], (err) => {
    if (err) console.log('Error inserting data:', err);
  });
}

module.exports = { insertClient };

