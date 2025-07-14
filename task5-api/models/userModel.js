const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

// Helper: read all users
function getAllUsers() {
  try {
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (err) {
    console.error('Error reading users.json:', err);
    return [];
  }
}

// Helper: save users to file
function saveUsers(users) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to users.json:', err);
  }
}

// Get user by ID
function getUserById(id) {
  const users = getAllUsers();
  return users.find(user => user.id === id);
}

// Add new user
function addUser(user) {
  const users = getAllUsers();
  users.push(user);
  saveUsers(users);
}

// Update user by ID
function updateUser(id, updatedData) {
  let users = getAllUsers();
  users = users.map(user =>
    user.id === id ? { ...user, ...updatedData } : user
  );
  saveUsers(users);
}

// Delete user by ID
function deleteUser(id) {
  let users = getAllUsers();
  users = users.filter(user => user.id !== id);
  saveUsers(users);
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};

