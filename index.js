// index.js
// Task A: CSV validation and insertion into MySQL

const fs = require('fs');
const csv = require('csv-parse');
const { insertClient } = require('./database');

// to read the "excel"
fs.readFile('Clients.csv', (err, data) => {
  if (err) throw err;

  csv.parse (data, { columns: true, trim: true }, (err, rows) => {
    if (err) throw err; 

    rows.forEach((row, index) => {
                                   // validate CSV row
      const namePattern = /^[a-zA-Z0-9]{1,20}$/;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^\d{10}$/;
      const eirPattern = /^[0-9][a-zA-Z0-9]{5}$/;

      let isValid = true;

      if (!namePattern.test(row.first_name)) isValid = false;
      if (!namePattern.test(row.last_name)) isValid = false;
      if (!emailPattern.test(row.email)) isValid = false;
      if (!phonePattern.test(row.phone)) isValid = false;
      if (!eirPattern.test(row.eir_code)) isValid = false;

      if (!isValid) {
        // index + 2 means that header is number 1, and 2 is the first data
        console.log(`Error in row ${index + 2}: invalid data`);
      } else {
        insertClient(row);
        // this one for only insert valid revords into the table
        // so if is not valid, dont go to the table 
      }
    });
  });
});
