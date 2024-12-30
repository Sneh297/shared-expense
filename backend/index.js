const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Alice Johnson' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Charlie Davis' },
    { id: 4, name: 'Diana Evans' },
    { id: 5, name: 'Ethan Wilson' },
  ]);
});

app.use('/api/user', require('./Routes/userRoute'));
app.use('/api/card', require('./Routes/card.route'));

app.listen(3000, () => console.log('Server started on port 3000'));
