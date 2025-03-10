require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 4000;
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to parse JSON
app.use(express.json());

// JWT Validation Route (Traefik ForwardAuth will call this)
app.get('/validate', (req, res) => {
  const authHeader = req.headers['authorization'];

  // Check if Authorization header is present
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Extract JWT token from Authorization header
  const token = authHeader.split(' ')[1];

  try {
    // Decode JWT
    const decoded = jwt.verify(token, SECRET_KEY);

    // Return extracted claims as headers
    res.json({
      'X-User-ID': decoded.user_id || '',
      'X-User-Role': decoded.role || '',
    });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
});

// Health Check Route
app.get('/', (req, res) => {
  res.send('JWT Auth Service is running');
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`JWT Auth Service running on port ${PORT}`);
});
