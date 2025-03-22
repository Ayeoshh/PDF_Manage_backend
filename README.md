
# 📄 PDF Management & Collaboration System - Backend

This is the backend service for a **Full-Stack PDF Management & Collaboration Application**. It enables users to upload, manage, share, and collaborate on PDF files through a secure and efficient RESTful API.

---

## 🚀 Overview

The **PDF Management & Collaboration System** is a web application that facilitates seamless handling of PDF documents. Users can:
- Sign up & authenticate securely
- Upload and search PDF files
- Share PDFs using unique links (even with unregistered users)
- Collaborate via real-time comments and replies

This repository contains the **Node.js/Express** backend that powers the core logic, API endpoints, database models, and security features.

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** React (separate repo)
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JWT-based with hashed passwords
- **Deployment:** [Railway](https://railway.app/)
- **API Testing:** Postman

---

## 🌟 Features

### 🔐 User Authentication & Authorization
- Register, login, logout
- Secure JWT-based authentication
- Password reset & update
- Password hashing with best practices

### 📤 PDF Upload & Management
- Upload validated PDF files
- View and delete uploaded PDFs
- Search PDFs by filename
- Retrieve all uploaded PDFs

### 🔗 File Sharing
- Generate unique shareable links
- Allow access via links without authentication

### 💬 Comments & Replies
- Add, update, delete comments on PDFs
- Nested replies
- Access control for commenting

### 🛡 Security & Privacy
- Access control for all routes
- Hashed password storage
- Share links with scoped access

---

## 🔁 API Endpoints

### 🔐 Auth Routes
