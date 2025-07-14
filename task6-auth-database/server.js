require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const usersRoutes = require('./routes/users'); // REST API routes
const userController = require('./controllers/userController'); // Import controller

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err.message));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data & JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

// Handle form submit & save user to DB (uses controller)
app.post('/submit', userController.addUser);

// Success page for direct GET
app.get('/success', (req, res) => {
  const { username, email, gender, phone } = req.query;
  res.render('success', { username, email, gender, phone });
});

// REST API routes
app.use('/api/users', usersRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));