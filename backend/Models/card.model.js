const mongoose = require('mongoose');

// CardDetails Schema
const carddetailsSchema = new mongoose.Schema({
  detail: {
    type: String,
    required: true,
    default: '', // Default value if no detail is provided
  },
  contributor: [
    {
      name: {
        type: String,
        required: true, // Contributor name is required
      },
      amount: {
        type: Number,
        required: true, // Contributor amount is required
        min: 0,
        default: 0, // Optionally ensure amount is a positive number
      },
    },
  ],
});

// Card Schema
const cardSchema = new mongoose.Schema({
  cardname: {
    type: String,
    required: true,
  },
  carddetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CardDetails', // Refers to the CardDetails schema
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  access: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ],
});

// Create Models
const CardDetails = mongoose.model('CardDetails', carddetailsSchema);
const Card = mongoose.model('Card', cardSchema);

// Export both models in an object
module.exports = {
  CardDetails,
  Card,
};
