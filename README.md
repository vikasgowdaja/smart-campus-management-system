# 🎓 Smart Campus Management Platform

*(DB + API + Development Journey)*

A **Full-Stack Smart Campus Management System** built using modern backend and frontend architecture, demonstrating real-world database design, REST API engineering, authentication, NoSQL logging, and external API integration.

This project is built progressively in structured stages, mirroring real-world software development practices with architectural refinement at each phase.

---

## 📌 Overview

The Smart Campus Management Platform simulates a real enterprise-grade system that manages:

* 🎓 Students & Admin Users
* 📅 Campus Events
* 🧪 Resource Booking
* 📊 Analytics Dashboard
* 🌦 External Weather API Integration
* 📘 Knowledge Hub (Project Architecture & Development Documentation)

This system demonstrates:

* Relational Database Design (MySQL/PostgreSQL)
* NoSQL Integration (MongoDB)
* REST API Architecture
* Secure Authentication (JWT)
* Environment-based configuration
* Clean Backend Architecture
* Production-Ready Engineering Practices

---

# 🏗 Tech Stack

## Frontend

* React + Vite
* Axios
* React Router
* Context API
* Modular Component Architecture

## Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt Password Hashing
* Joi Validation
* Clean Layered Architecture

## Databases

* MySQL / PostgreSQL (Relational)
* MongoDB (Logging & Activity Tracking)

## External Integration

* OpenWeather API (Event-based weather insights)

---

# 🧠 Architecture Philosophy

This project is built progressively, reflecting real-world engineering evolution.

Development Stages:

1. MVP Backend (Core CRUD)
2. Database Normalization & Relationship Modeling
3. Authentication & Role-based Authorization
4. NoSQL Logging Integration
5. External API Integration
6. Production Hardening
7. Frontend Integration
8. Knowledge Hub Documentation

The focus is not only on functionality, but on architectural maturity and maintainability.

---

# 📂 Project Structure

```
smart-campus-management-system/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── context/
│   │   └── hooks/
│
└── README.md
```

---

# ✨ Features

## 🔐 Authentication

* JWT-based login & registration
* Role-based access control (Admin / Student)
* Protected routes
* Secure password hashing

## 📅 Event Management

* Create, update, delete events (Admin)
* Register for events (Student)
* Event capacity tracking
* Weather snapshot integration

## 🧪 Resource Booking

* Resource availability tracking
* Booking conflict prevention
* Aggregation-based reporting

## 📊 Dashboard & Analytics

* Event participation statistics
* Resource usage insights
* Aggregated SQL queries

## 🗂 NoSQL Logging

* Login attempts
* API errors
* Activity tracking
* Flexible document schema for operational logs

## 📘 Knowledge Hub

* Documents project evolution
* Highlights architectural decisions
* Explains design improvements across stages
* Serves as a structured technical case study

---

# 🛠 Getting Started

## Clone Repository

```bash
git clone <your-repo-url>
cd smart-campus-management-system
```

---

## Backend Setup

```bash
cd backend
npm install
```

### Environment Configuration

Copy example file:

```bash
cp .env.example .env
```

Update your `.env` file:

```
PORT=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
MONGO_URI=
WEATHER_API_KEY=
```

---

### Run Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🧮 Database Design

## Relational Tables

* Users
* Events
* Event_Registrations
* Resources
* Bookings

Concepts Covered:

* Primary Keys
* Foreign Keys
* Normalization
* Constraints
* Indexing
* Aggregations
* Joins
* Subqueries

---

# 📊 Example Aggregation Endpoint

```
GET /api/events/stats
```

Returns:

* Total events
* Registrations per event
* Most booked resource
* Active users

---

# 🌦 External API Integration

When an admin creates an event:

* Weather forecast is fetched from OpenWeather API
* Snapshot is stored in the database
* Retry logic handles transient failures
* Graceful fallback ensures system stability

---

# 🔒 Security Practices

* Environment-based configuration
* JWT authentication
* Input validation
* Centralized error handling
* Role-based authorization
* Separation of transactional and logging databases
* No secrets committed to repository

---

# 🔁 Development Workflow

## Branch Strategy

All features branch from `develop`.

```
feature/stage-1-mvp
feature/stage-2-db-normalization
feature/stage-3-auth
feature/stage-4-nosql
feature/stage-5-external-api
feature/frontend-integration
```

---

## Commit Format

```
SC-01: feat: implement user authentication
SC-02: refactor: normalize database schema
SC-03: feat: integrate MongoDB logging
SC-04: chore: configure production environment
```

---

# 📦 Deployment

Backend:

* Render
* Railway
* AWS EC2

Database:

* Managed MySQL instance
* MongoDB Atlas

Frontend:

* Vercel
* Netlify

---

# 🧪 Testing

* Postman collection included
* API validation scenarios documented
* Error response examples provided

---

# 📈 Learning Outcomes

After completing this project, developers demonstrate:

* Full-stack architectural understanding
* Relational and NoSQL integration
* REST API engineering
* Secure authentication implementation
* External API integration
* Production-level backend structuring
* Real-world development workflow experience

---

# 📄 License

This project is licensed under the MIT License.

---

# 🤝 Support

For questions or improvements:

* Create an issue
* Submit a pull request
* Follow branch and commit guidelines

---

# 💎 Final Note

This is not just a database project.
This is not just a REST API project.
This is not just a frontend project.

This is a structured engineering journey —
built progressively, refined architecturally, and implemented with production discipline.