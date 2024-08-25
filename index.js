const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// GET request to /bfhl
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

// POST request to /bfhl
app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid input. Please provide an array of data."
    });
  }

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));
  const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
  const highestLowercaseAlphabet = lowercaseAlphabets.sort().slice(-1);

  const response = {
    is_success: true,
    user_id: "john_doe_17091999", // Replace with actual user ID
    email: "john@xyz.com", // Replace with actual email
    roll_number: "ABCD123", // Replace with actual roll number
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
  };

  res.status(200).json(response);
});

// Default route for root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Express API');
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
