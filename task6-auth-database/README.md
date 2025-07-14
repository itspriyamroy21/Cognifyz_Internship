# ✨ Task 6 - Auth & Database Integration

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express.js-^4.18-lightgrey)
![EJS](https://img.shields.io/badge/EJS-template-orange)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-blueviolet)
![JavaScript](https://img.shields.io/badge/JavaScript-DOM-yellow)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-red)

Task 6 for **Cognifyz Internship**:  
Migrate from file-based `users.json` → to **MongoDB** database.  
Keep the frontend **signup form** same, but now store and fetch data using **Mongoose**.

---

## ✏️ **Features**

- Node.js + Express backend
- MongoDB Atlas cloud database
- Mongoose models for schema & validation
- REST API at `/api/users` with CRUD:
  - `POST /api/users` → Create new user
  - `GET /api/users` → Get all users
  - `GET /api/users/:id` → Get user by ID
  - `PUT /api/users/:id` → Update user
  - `DELETE /api/users/:id` → Delete user
- Frontend signup form saves user directly to DB
- EJS template engine for frontend
- JSON API responses
- Secure `.env` for connection string (added to `.gitignore`)
- Tested locally with **MongoDB Atlas**

---

## 📦 **Tech Stack**

- Node.js
- Express.js
- EJS
- MongoDB (Atlas)
- Mongoose
- Bootstrap 5
- JavaScript (DOM)
- dotenv

---

## 🚀 **How to run locally**

```bash
# Clone the project
git clone <repo_url>
cd task6-auth-database

# Install dependencies
npm install

# Add your MongoDB URI in a .env file
echo "MONGODB_URI=your_mongodb_connection_string" >> .env
echo "PORT=3000" >> .env

# Start server
npm start
