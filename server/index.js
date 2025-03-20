const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Startsy',
  password: 'postgres',
  port: 5432,
});

app.post('/register', async (req, res) => {
  const { username, password, role, fullName } = req.body;

  try {
    const userExists = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, password_hash, role, full_name) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, hashedPassword, role, fullName]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isValidPassword = await bcrypt.compare(password, user.password_hash);

      if (isValidPassword) {

        const token = jwt.sign(
          { id: user.id, username: user.username },
          'your-secret-key',
          { expiresIn: '1h' }
        );

        res.status(200).json({
          message: 'Login successful',
          token,
          user: {
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            role: user.role,
          },
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});