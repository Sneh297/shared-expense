const express = require('express');
const router = express.Router();
const { Card, CardDetails } = require('../Models/card.model'); // Import both models

// Route to create a new card
router.post('/create-card', async (req, res) => {
  const { cardname, carddetails, contributor, id } = req.body;

  if (!cardname || !carddetails || !contributor) {
    return res.status(400).json({ error: 'Please fill all the fields' });
  }

  try {
    // Create a new CardDetails document with contributor array
    const newCardDetails = await CardDetails.create({
      detail: carddetails, // assuming 'carddetails' is a string describing the card details
      contributor: contributor, // array of contributor objects
    });

    console.log('New CardDetails created:', newCardDetails);

    // Create a new Card document, with the ID of the newly created CardDetails
    const newCard = await Card.create({
      cardname,
      carddetails: newCardDetails._id, // reference to the CardDetails document
      createdBy: id,
      access: [id],
    });

    res
      .status(200)
      .json({ message: 'Card created successfully', card: newCard });
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/cards', async (req, res) => {
  const id = req.query.id;

  try {
    const cards = await Card.find({
      $or: [
        { createdBy: id }, // Cards created by the user
        { access: id }, // Cards that the user has access to
      ],
    });

    res.status(200).json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
