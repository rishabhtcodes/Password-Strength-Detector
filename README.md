# 🔐 PassGuard — Password Strength Detector

A full-stack web application that analyzes password strength in real-time, estimates crack time, and stores analysis results in MongoDB.

![Built with React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)

## ✨ Features

- **Real-time Strength Analysis** — Colored progress bar updates as you type
- **Password Rules Checklist** — ✅/❌ indicators for length, uppercase, lowercase, digits, symbols
- **Crack Time Estimation** — Brute-force time estimate (Instant → Millions of years)
- **Improvement Suggestions** — Actionable feedback when password is weak
- **Password Generator** — One-click strong random password with copy-to-clipboard
- **Server Analysis** — Send password to Express API for analysis + MongoDB storage
- **Cybersecurity UI** — Dark theme with neon accents, grid background, and glow effects

## 📁 Project Structure

```
root/
├── api/            # Vercel Serverless Functions
│   ├── _lib/
│   │   └── passwordStrength.js
│   └── password/
│       ├── check.js
│       └── history.js
├── client/         # React + Vite + TailwindCSS
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── PasswordInput.jsx
│       │   ├── StrengthMeter.jsx
│       │   ├── PasswordChecklist.jsx
│       │   ├── PasswordSuggestions.jsx
│       │   └── PasswordGenerator.jsx
│       ├── utils/
│       │   └── passwordStrength.js
│       ├── App.jsx
│       └── main.jsx
├── server/         # Node.js + Express + Mongoose
│   ├── controllers/
│   │   └── passwordController.js
│   ├── routes/
│   │   └── passwordRoutes.js
│   ├── models/
│   │   └── PasswordAnalysis.js
│   ├── utils/
│   │   └── passwordStrength.js
│   └── server.js
├── vercel.json     # Vercel Deployment Configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **MongoDB** running locally on port 27017 (or a MongoDB Atlas URI)

### 1. Clone the repository

```bash
git clone https://github.com/rishabhtcodes/Password-Strength-Detector.git
cd Password-Strength-Detector
```

### 2. Start the backend

```bash
cd server
npm install
npm run dev
```

The server will start on `http://localhost:5000`.

> **Note:** If using MongoDB Atlas, update `MONGO_URI` in `server/.env` with your connection string.

### 3. Start the frontend

```bash
cd client
npm install
npm run dev
```

The client will start on `http://localhost:5173` and proxies API requests to the backend.

## 🔌 API Endpoints

### `POST /api/password/check`

Analyze a password and save the result to MongoDB.

**Request:**
```json
{ "password": "MyStr0ng!Pass" }
```

**Response:**
```json
{
  "score": 5,
  "strength": "Very Strong",
  "rules": {
    "length": true,
    "uppercase": true,
    "lowercase": true,
    "number": true,
    "symbol": true
  },
  "suggestions": [],
  "crackTime": "Millions of years"
}
```

### `GET /api/password/history`

Retrieve the 20 most recent password analyses.

## ⚠️ Disclaimer

This project is for **educational purposes only**. Never store raw passwords in production applications.

## 📜 License

ISC License

Copyright (c) 2026 Rishabh

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
