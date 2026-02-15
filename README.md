# Smart Campus Event System (Stage 1 MVP)

Minimal REST API using Node.js, Express, and MySQL.

## Features

- Users table CRUD
- Events table CRUD
- Async/await across DB/model/controller layers
- Clean modular folder structure
- No authentication (as requested)

## Project Structure

```text
smart-campus-management-system/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── eventController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── eventModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── eventRoutes.js
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
```

3. Create database schema in MySQL:

- Open MySQL client
- Run the SQL from `sql-schema.txt`

4. Start API:

```bash
npm run dev
```

Health check:

```http
GET http://localhost:3000/api/health
```

## API Endpoints

### Users

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
  "role": "student"
}
```

### Events

- `GET /api/events`
- `GET /api/events/:id`
- `POST /api/events`
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
