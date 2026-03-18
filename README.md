# 📘 Book Store Backend API

## 🚀 Overview
A **RESTful Book Store Backend API** built using **Node.js and Express**, designed to handle user authentication and book management efficiently.  
This project demonstrates strong backend fundamentals including API design, database handling, and secure authentication.

---

## ✨ Features
- 🔐 JWT-based Authentication (Register/Login)
- 📚 Full CRUD Operations for Books
- 🔎 Search & Filter functionality
- 📄 Pagination support
- ⚡ Error handling & validation
- 🗂️ Clean and scalable folder structure (MVC)

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JSON Web Token (JWT)  
- **Tools:** Git, GitHub, Postman  

---

## 📂 Project Structure

bookstore-backend/
│
├── config/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── server.js
└── package.json


---

## 🔗 API Endpoints

### 🔐 Authentication Routes
- `POST /api/auth/register` → Register user  
- `POST /api/auth/login` → Login user  

---

### 📚 Book Routes
- `GET /api/books` → Get all books  
- `GET /api/books/:id` → Get book by ID  
- `POST /api/books` → Create book *(Protected)*  
- `PUT /api/books/:id` → Update book *(Protected)*  
- `DELETE /api/books/:id` → Delete book *(Protected)*  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/bookstore-backend.git
cd bookstore-backend
