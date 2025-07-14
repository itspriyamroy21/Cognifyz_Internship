const fs = require('fs');
const path = require('path');

// Path to your users.json
const dataPath = path.join(__dirname, 'data/users.json');

try {
  // Read existing users
  const jsonData = fs.readFileSync(dataPath, 'utf-8');
  const users = JSON.parse(jsonData);

  // Reset ids: assign new sequential ids starting from 1
  const updatedUsers = users.map((user, index) => ({
    ...user,
    id: index + 1
  }));

  // Write back to users.json
  fs.writeFileSync(dataPath, JSON.stringify(updatedUsers, null, 2), 'utf-8');

  console.log('✅ IDs reset successfully! Check data/users.json');
} catch (err) {
  console.error('❌ Error resetting IDs:', err);
}