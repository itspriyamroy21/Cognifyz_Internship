const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Import the users API routes
const usersRoutes = require('./routes/users');

// Import addUser and getAllUsers from userModel
const { addUser, getAllUsers } = require('./models/userModel');

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data & JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
// Home page
app.get('/', (req, res) => {
  res.render('index');
});

// Handle form submit & save user
app.post('/submit', (req, res) => {
  const { username, email, gender, phone } = req.body;

  // Read current users and get next id
  const users = getAllUsers();
  const newId = users.length ? users[users.length - 1].id + 1 : 1;

  // Create new user object
  const newUser = { id: newId, username, email, gender, phone };

  // Save to users.json
  addUser(newUser);

  // Render success page
  res.render('success', {
    username,
    email,
    gender,
    phone
  });
});

// Success page for direct GET
app.get('/success', (req, res) => {
  const { username, email, gender, phone } = req.query;
  res.render('success', { username, email, gender, phone });
});

// REST API routes
app.use('/api/users', usersRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running at: http://localhost:${PORT}`));