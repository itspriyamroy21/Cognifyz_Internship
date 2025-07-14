const fs = require('fs');
const path = require('path');

// Get path to users.json
const dataPath = path.join(__dirname, '../data/users.json');

// Helper to read users from file
function readUsers() {
  const jsonData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(jsonData);
}

// Helper to write users to file
function writeUsers(users) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2), 'utf-8');
}

// @desc    Get all users
// @route   GET /api/users
exports.getAllUsers = (req, res) => {
  const users = readUsers();
  res.json(users);
};

// @desc    Get user by ID
// @route   GET /api/users/:id
exports.getUserById = (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

// @desc    Create new user
// @route   POST /api/users
exports.createUser = (req, res) => {
  const users = readUsers();
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    ...req.body
  };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
};

// @desc    Update user
// @route   PUT /api/users/:id
exports.updateUser = (req, res) => {
  const users = readUsers();
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  users[index] = { ...users[index], ...req.body };
  writeUsers(users);
  res.json(users[index]);
};

// @desc    Delete user
// @route   DELETE /api/users/:id
exports.deleteUser = (req, res) => {
  let users = readUsers();
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  const deletedUser = users[index];
  users.splice(index, 1);
  writeUsers(users);
  res.json({ message: 'User deleted', user: deletedUser });
};
