
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

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-repo/spotdraft.git
cd spotdraft/backend
```

2. Install dependencies:

```sh
npm install
```

3. Create a `.env` file in the `backend` directory and add the following environment variables:

```env
DB_PORT=5432
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_DATABASE=pdfCollaboration
DB_USER=postgres

PORT=8000

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=10h

BASE_URL=http://localhost:8000

DATABASE_URL=your_database_url
```

4. Start the server:

```sh
npm run dev
```

The server will start on `http://localhost:8000`.

## API Endpoints

### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/logout` - Logout a user
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/update-password` - Update password

### PDFs

- `POST /api/pdfs/upload` - Upload a PDF (requires authentication)
- `GET /api/pdfs/all` - Get all PDFs
- `GET /api/pdfs/view/pdf/:id` - Get a PDF by ID
- `DELETE /api/pdfs/:id` - Delete a PDF (requires authentication)
- `GET /api/pdfs/search` - Search PDFs
- `POST /api/pdfs/share/:id` - Generate a shareable link for a PDF (requires authentication)
- `GET /api/pdfs/shared/:token` - Get a shared PDF by token

### Comments

- `GET /api/comments/:pdfId` - Get comments for a PDF
- `POST /api/comments/:pdfId` - Add a comment to a PDF (requires authentication)
- `PUT /api/comments/:commentId` - Update a comment (requires authentication)
- `DELETE /api/comments/:commentId` - Delete a comment (requires authentication)
- `POST /api/comments/reply/:commentId` - Reply to a comment (requires authentication)

🧪 Testing
All endpoints have been tested using Postman to ensure proper request/response handling and error checking.

🚀 Deployment
This backend is deployed on Railway. Be sure to set environment variables in your Railway project settings for production use.

👤 Author
Ayush
GitHub: @Ayeoshh

