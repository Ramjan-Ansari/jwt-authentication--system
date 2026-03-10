# MERN Authentication System

A secure authentication system built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.  
This project implements **JWT Authentication with Access Token and Refresh Token using HTTP-only cookies**.

---

## Features

- User Registration
- User Login
- JWT Authentication
- Access Token (15 minutes)
- Refresh Token (7 days)
- HTTP-only Cookie Security
- Protected Routes using Middleware
- Logout System
- Secure Password Hashing with bcrypt
- REST API Architecture

---

## Tech Stack

Frontend:
- React.js
- Axios
- React Router

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- cookie-parser

---

## Authentication Flow

1. User registers an account
2. User logs in with email and password
3. Server generates:
   - Access Token (15 minutes)
   - Refresh Token (7 days)
4. Tokens are stored in **HTTP-only cookies**
5. Protected routes verify the Access Token
6. If Access Token expires, Refresh Token generates a new Access Token
7. User logs out and cookies are cleared

---
