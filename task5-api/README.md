# ✨ Task 5 - REST API & Frontend Integration

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express.js-^4.18-lightgrey)
![EJS](https://img.shields.io/badge/EJS-template-orange)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-blueviolet)
![JavaScript](https://img.shields.io/badge/JavaScript-DOM-yellow)
![REST API](https://img.shields.io/badge/REST%20API-CRUD-red)

Task 5 for **Cognifyz Internship**:  
Build a small **REST API** with full **CRUD** (Create, Read, Update, Delete) functionality, store data in a JSON file, test using **Postman**, and connect the API to the frontend signup form from Task 4.

---

## ✏️ **Features**

- Node.js + Express backend
- REST API at `/api/users`
- CRUD operations:
  - `POST /api/users` → Create new user
  - `GET /api/users` → Get all users
  - `GET /api/users/:id` → Get user by ID
  - `PUT /api/users/:id` → Update user
  - `DELETE /api/users/:id` → Delete user
- Save data to `users.json` file (acts as a mock database)
- Frontend signup form saves data to backend
- JSON responses for all endpoints
- Tested with **Postman**
- Nodemon for auto-restart during development

---

## 🚀 **How to run locally**

```bash
cd task5-rest-api
npm install
npm run dev