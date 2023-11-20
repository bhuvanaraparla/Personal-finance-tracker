const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Use the body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the main MongoDB Atlas cluster
mongoose.connect('mongodb+srv://bhuvana:88hiBJq7Z.Ncf_v@cluster0.dydxoqq.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  databaseName: String,
});

// Create the User model
const UserModel = mongoose.model('User', userSchema);

// Assume you have a route for user registration
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Create a new user document in the main cluster
    const user = new UserModel({ name, email, password, databaseName: `user_${uniqueUserID}` });
    await user.save();

    // Create a new MongoDB Atlas database for the user
    const userDBConnection = mongoose.createConnection(`mongodb+srv://bhuvana:88hiBJq7Z.Ncf_v@cluster0.dydxoqq.mongodb.net/${user.databaseName}`, { useNewUrlParser: true, useUnifiedTopology: true });

    const { IncomeModel, ExpenseModel, SavingsModel } = require('./models');

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
