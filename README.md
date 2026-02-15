# Smart Campus Event System (Stage 1 MVP)

Minimal REST API using Node.js, Express, MySQL (primary), and MongoDB (activity logs).

## Features

- Users table CRUD
- Events table CRUD
- Event registrations table CRUD
- JOIN-based event and registration responses
- Aggregation endpoint: `GET /api/events/stats`
- JWT authentication (`register`, `login`)
- Password hashing using bcrypt
- Role-based authorization (Admin-only event creation)
- MongoDB activity logs collection (`activity_logs`)
- Login attempt logging and API error logging
- Logging middleware for request/error tracking
- OpenWeather forecast integration on admin event creation
- Weather snapshot stored in MySQL (`events.weather_snapshot`)
- API retry with exponential backoff for weather fetch
- Input validation with Joi
- Rate limiting
- CORS configuration
- Deployment-ready environment configuration
- Swagger API docs (`/api/docs`)
- Async/await across DB/model/controller layers
- Clean modular folder structure

## Project Structure

```text
smart-campus-management-system/
├── src/
│   ├── config/
│   │   └── db.js
│   │   └── env.js
│   │   └── mongo.js
│   │   └── weather.js
│   ├── controllers/
│   │   ├── eventController.js
│   │   ├── registrationController.js
│   │   └── userController.js
│   ├── docs/
│   │   └── swagger.js
│   ├── middleware/
│   │   ├── errorLogMiddleware.js
│   │   ├── jwtMiddleware.js
│   │   ├── requestLogMiddleware.js
│   │   ├── validateMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── activityLogModel.js
│   │   ├── eventModel.js
│   │   ├── registrationModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── eventRoutes.js
│   │   ├── registrationRoutes.js
│   │   └── userRoutes.js
│   ├── validation/
│   │   └── schemas.js
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
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=smart_campus_event_system
JWT_SECRET=change_this_secret
JWT_EXPIRES_IN=1d
MONGO_URI=mongodb://127.0.0.1:27017/smart_campus_logs
CORS_ORIGIN=*
RATE_LIMIT_WINDOW_MINUTES=15
RATE_LIMIT_MAX=100
OPENWEATHER_API_KEY=your_openweather_api_key
OPENWEATHER_MAX_RETRIES=3
OPENWEATHER_RETRY_BASE_MS=500
```

3. Start MySQL server locally (required).

4. Start MongoDB server locally (optional for logs, recommended).

5. Set OpenWeather API key in `.env` (required for weather snapshot).

6. Start API:

```bash
npm run dev
```

On startup, the API now automatically executes `sql-schema.txt` to create the database and tables if they do not exist.

If auto-create fails due to permissions, run SQL manually from `sql-schema.txt` in your MySQL client.

Health check:

```http
GET http://localhost:3000/api/health
```

Swagger docs:

```http
GET http://localhost:3000/api/docs
```

`/api/health` now includes `dbConnected` (MySQL) and `mongoConnected` (MongoDB).

## Production Hardening Notes

- **Security headers** via Helmet
- **Rate limiting** via `RATE_LIMIT_WINDOW_MINUTES` and `RATE_LIMIT_MAX`
- **CORS policy** via `CORS_ORIGIN`
- **Input validation** via Joi schemas
- **Environment validation** at startup (`src/config/env.js`)

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

On `POST /api/events`, weather forecast is fetched from OpenWeather and stored in MySQL.
If the weather API fails, event creation still succeeds and weather data is saved as `null`.

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
