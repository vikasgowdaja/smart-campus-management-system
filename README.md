# Smart Campus Event System (Stage 1 MVP)

Minimal REST API using Node.js, Express, and MySQL.

## Features

- Users table CRUD
- Events table CRUD
- Event registrations table CRUD
- JOIN-based event and registration responses
- Aggregation endpoint: `GET /api/events/stats`
- JWT authentication (`register`, `login`)
- Password hashing using bcrypt
- Role-based authorization (Admin-only event creation)
- Async/await across DB/model/controller layers
- Clean modular folder structure

## Project Structure

```text
smart-campus-management-system/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── eventController.js
│   │   ├── registrationController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── jwtMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── eventModel.js
│   │   ├── registrationModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── eventRoutes.js
│   │   ├── registrationRoutes.js
│   │   └── userRoutes.js
│   ├── app.js
│   └── server.js
├── env.example.txt
├── sql-schema.txt
├── package.json
└── README.md
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` in the project root using values from `env.example.txt`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=smart_campus_event_system
JWT_SECRET=change_this_secret
JWT_EXPIRES_IN=1d
```

3. Start MySQL server locally (required).

4. Start API:

```bash
npm run dev
```

On startup, the API now automatically executes `sql-schema.txt` to create the database and tables if they do not exist.

If auto-create fails due to permissions, run SQL manually from `sql-schema.txt` in your MySQL client.

Health check:

```http
GET http://localhost:3000/api/health
```

## API Endpoints

### Users

Auth endpoints:

- `POST /api/users/register`
- `POST /api/users/login`

- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

User payload:

```json
{
  "name": "Alice",
  "email": "alice@campus.edu",
  "role": "student",
  "password": "YourPassword123"
}
```

Register payload:

```json
{
  "name": "Admin User",
  "email": "admin@campus.edu",
  "password": "AdminPass123",
  "role": "admin"
}
```

Login payload:

```json
{
  "email": "admin@campus.edu",
  "password": "AdminPass123"
}
```

### Events

- `GET /api/events`
- `GET /api/events/stats`
- `GET /api/events/:id`
- `POST /api/events` (Admin only, requires `Authorization: Bearer <token>`)
- `PUT /api/events/:id`
- `DELETE /api/events/:id`

Event payload:

```json
{
  "title": "AI Workshop",
  "description": "Hands-on intro to AI",
  "event_date": "2026-03-10 10:00:00",
  "location": "Lab 2",
  "created_by": 1
}
```

### Event Registrations

- `GET /api/registrations`
- `GET /api/registrations/:id`
- `POST /api/registrations`
- `PUT /api/registrations/:id`
- `DELETE /api/registrations/:id`

Registration payload:

```json
{
  "event_id": 1,
  "user_id": 1,
  "status": "registered"
}
```
