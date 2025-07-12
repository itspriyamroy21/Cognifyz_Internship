const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  // server-side validation
  if (!name || !email || !message) {
    return res.status(400).send('All fields are required.');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send('Invalid email format.');
  }
  if (message.length < 5) {
    return res.status(400).send('Message too short.');
  }

  res.render('success', { name, email, message });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
