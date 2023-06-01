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


// Create a PostgreSQL client
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5433, // Use the correct port number for your PostgreSQL installation
  password: "Bhale@1999",
  database: "postgres"
});

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database successfully1111111111111111');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database:', err);
  });


  app.get('/products/:id', (req, res) => {
    const categoryId = req.params.id;
    const query = `SELECT * FROM public."product_master" WHERE category_id = $1`;
  
    client.query(query, [categoryId])
      .then((result) => {
        res.json(result.rows); // Return the query result as JSON
      })
      .catch((err) => {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' }); // Return an error message as JSON
      });
  });



// Edit a product
app.put('/products/:id', (req, res) => {
  const productId = req.params.id;
  const { name, category_id } = req.body;
  const query = `UPDATE public."product_master" SET name = $1, category_id = $2 WHERE id = $3 RETURNING *`;

  client.query(query, [name, category_id, productId])
    .then((result) => {
      if (result.rows.length > 0) {
        res.json(result.rows[0]); // Return the updated product as JSON
      } else {
        res.status(404).json({ error: 'Product not found' }); // Return an error message if the product is not found
      }
    })
    .catch((err) => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' }); // Return an error message as JSON
    });
});

// Create a new product
app.post('/products', (req, res) => {
  const { name, category_id } = req.body;
  const query = `INSERT INTO public."product_master" (name, category_id) VALUES ($1, $2) RETURNING *`;

  client.query(query, [name, category_id])
    .then((result) => {
      res.json(result.rows[0]); // Return the newly created product as JSON
    })
    .catch((err) => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' }); // Return an error message as JSON
    });
});

// Delete a product
app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;
  const query = `DELETE FROM public."product_master" WHERE id = $1 RETURNING *`;

  client.query(query, [productId])
    .then((result) => {
      if (result.rows.length > 0) {
        res.json({ message: 'Product deleted successfully' }); // Return a success message as JSON
      } else {
        res.status(404).json({ error: 'Product not found' }); // Return an error message if the product is not found
      }
    })
    .catch((err) => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' }); // Return an error message as JSON
    });
});


// Define the API endpoint
app.get('/categories', (req, res) => {
  const query = 'SELECT * FROM public."Category_master"';

  client.query(query)
    .then((result) => {
      res.json(result.rows); // Return the query result as JSON
    })
    .catch((err) => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' }); // Return an error message as JSON
    });
});



// Add a new category
app.post('/categories', (req, res) => {
  const { categoryName } = req.body;
  const query = `INSERT INTO public."Category_master" ("name") VALUES ($1) RETURNING *`;

  client.query(query, [categoryName])
    .then((result) => {
      res.json(result.rows[0]); // Return the newly created category as JSON
    })
    .catch((err) => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' }); // Return an error message as JSON
    });
});

// Edit an existing category
app.put('/categories/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;
  const { categoryName } = req.body;
  const query = `UPDATE public."Category_master" SET "name" = $1 WHERE "id" = $2 RETURNING *`;

  client.query(query, [categoryName, categoryId])
    .then((result) => {
      if (result.rows.length > 0) {
        res.json(result.rows[0]); // Return the updated category as JSON
      } else {
        res.status(404).json({ error: 'Category not found' }); // Return an error message if the category is not found
      }
    })
    .catch((err) => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' }); // Return an error message as JSON
    });
});

// Delete a category
app.delete('/categories/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;
  const query = `DELETE FROM public."Category_master" WHERE "id" = $1 RETURNING *`;

  client.query(query, [categoryId])
    .then((result) => {
      if (result.rows.length > 0) {
        res.json({ message: 'Category deleted successfully' }); // Return a success message as JSON
      } else {
        res.status(404).json({ error: 'Category not found' }); // Return an error message if the category is not found
      }
    })
    .catch((err) => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' }); // Return an error message as JSON
    });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
