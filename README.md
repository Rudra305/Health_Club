# 🏋️ Health Club - Gym & Fitness Management System

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://health-club-gamma.vercel.app/login)
[![React](https://img.shields.io/badge/React-17.0.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.1-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

A modern, fullstack web application for Gym & Health Club administration, trainer management, and member activity subscriptions. Built with a responsive **React** frontend, a **Node.js/Express** REST API backend, and deployed serverless on **Vercel**.

🔗 **Live URL**: [https://health-club-gamma.vercel.app/login](https://health-club-gamma.vercel.app/login)

---

## ⚡ Quick Demo Accounts

You can test all roles using the pre-seeded credentials or by clicking the quick-login pills on the sign-in page:

| Role | Username | Password | Features Accessible |
| :--- | :--- | :--- | :--- |
| 👑 **Admin** | `admin` | `admin123` | Trainer & Customer management, account activation/deactivation, feedback inspection |
| 🏋️ **Trainer** | `trainer_john` | `password123` | Assigned facility overview, enrolled member roster and status |
| 🏃 **Member** | `customer1` | `password123` | Activity subscriptions (Gym, Yoga, Swimming), feedback submission |

---

## ✨ Features

- **Role-Based Authentication**: Secure JWT-based access for Admins, Trainers, and Members.
- **Member Dashboard**: One-click subscription & unsubscription for club facilities (Gym, Swimming, Yoga).
- **Trainer Management**: Roster of enrolled members per facility with active/inactive status pills.
- **Admin Control Center**: Comprehensive tabular overview of all members and trainers with account enable/disable/delete actions.
- **Feedback & Rating System**: Real-time star ratings and member reviews.
- **Real-time Analytics & Core Web Vitals**: Integrated `@vercel/analytics` and `@vercel/speed-insights`.

---

## 🛠️ Architecture & Tech Stack

```
Health_Club/
├── api/                  # Vercel Serverless Function entrypoint (routes to Express)
│   └── index.js
├── backend/              # Node.js & Express REST API
│   ├── server.js         # API routes, auth, and in-memory mock database
│   └── package.json
├── src/                  # React Single Page Application (SPA)
│   ├── api/              # Centralized API service layer
│   ├── components/       # UI Components (Admin, Member, Trainer, Auth, Feedback)
│   ├── index.css         # Modern design tokens & styles
│   └── App.js
├── vercel.json           # Vercel routing & SPA rewrites configuration
└── package.json          # Root dependencies & build scripts
```

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/signIn` | Authenticates user and returns JWT token & role |
| `GET` | `/showUser/:username` | Fetches member profile and enrolled activities |
| `GET` | `/showTrainer/:username` | Fetches trainer profile and assigned activity |
| `GET` | `/showAllUser` | Returns all registered gym members |
| `GET` | `/showAllTrainers` | Returns all active fitness trainers |
| `POST` | `/signupUser` | Registers a new member account |
| `POST` | `/signupForTrainer` | Registers a new trainer account |
| `PATCH` | `/subscribeMembership` | Subscribes a member to a facility |
| `PATCH` | `/unsubscribeMembership` | Removes a member's facility subscription |
| `POST` | `/sendFeedback` | Submits member feedback and star rating |
| `GET` | `/showAllFeedbacks` | Retrieves all customer feedbacks |
| `PATCH` | `/activateAccountUser/:id` | Activates member account |
| `PATCH` | `/deactivateAccountUser/:id` | Deactivates member account |
| `DELETE` | `/deleteUser/:id` | Deletes member record |

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+ or 20+ (Node 24 supported)
- npm or yarn

### 1. Clone Repository
```bash
git clone https://github.com/Rudra305/Health_Club.git
cd Health_Club
```

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Run Locally

**Start the Express REST Backend (Port 9090):**
```bash
npm run start:backend
```

**Start the React Frontend (Port 3000):**
```bash
npm start
```

Visit `http://localhost:3000` in your browser.

---

## 🌐 Deploy to Vercel

1. Push your changes to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Vercel will automatically detect `vercel.json` and deploy both the React frontend and Express serverless functions.
