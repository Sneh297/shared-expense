const express = require('express');
const router = express.Router();
const userSchema = require('../Models/user.model');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Please fill all the fields' });
  }

  const user = await userSchema.findOne({ email });
  res
    .status(200)
    .json({ message: 'User logged in successfully', user: user._id });
});

router.post('/sign-up', async (req, res) => {
  const { email, password } = req.body;

  // Validate that both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: 'Please fill all the fields' });
  }

  try {
    // Check if the user already exists by email
    const existingUser = await userSchema.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // If user does not exist, create a new user
    const user = await userSchema.create({ email, password });

    // Respond with success message after user creation
    res.status(201).json({ message: 'success' });
  } catch (error) {
    // Handle any server errors
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
