const { Client } = require('pg');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// CORS middleware
app.use(cors({
  origin: 'http://localhost:4200'
}));

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5433, // Use the correct port number for your PostgreSQL installation
  password: "Bhale@1999",
  database: "postgres"
});

client.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database successfully");

    client.query('SELECT * FROM public."Category_master"', (err,res) => {
      if (!err) {
        console.log(res.rows);
      } else {
        console.log(err.message);
      }
      client.end(); // Corrected typo: it should be "end()" instead of "end"
    });
  })
  .catch((err) => {
    console.log("Error connecting to PostgreSQL database:", err.message);
  });



  app.get('/categories', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    const query = 'SELECT * FROM public."Category_master"';
  
    client.query(query)
      .then((result) => {
        res.json(result.rows);
      })
      .catch((err) => {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' });
      });
  });
  



// const { Client } = require('pg');

// const client = new Client({
//   host: "localhost",
//   user: "postgres",
//   port: 5433, // Use the correct port number for your PostgreSQL installation
//   password: "Bhale@1999",
//   database: "postgres"
// });

// client.connect();

// client.query('SELECT * FROM "Table_1"', (err, res) => {
//   if (!err) {
//     console.log(res.rows);
//   } else {
//     console.log(err.message);
//   }
//   client.end(); // Corrected typo: it should be "end()" instead of "end"
// });


// client.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err.stack);
//     return;
//   }

//   console.log('Connected to the database');

//   client.query('SELECT * FROM "Table_1"', (err, res) => {
//     if (err) {
//       console.error('Error executing query:', err.message);
//     } else {
//       console.log(res.rows);
//     }

//     client.end((err) => {
//       if (err) {
//         console.error('Error closing the database connection:', err.stack);
//       } else {
//         console.log('Database connection closed');
//       }
//     });
//   });
// });
