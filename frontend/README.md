# Smart Campus Management System – Frontend

Production-ready React frontend for the Smart Campus backend.

## Stack

- React (functional components)
- Vite
- Axios
- React Router
- Context API (authentication)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` in `frontend/` based on `env.example.txt`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

3. Run development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Preview production build:

```bash
npm run preview
```

## Security Behaviors

- JWT stored in `localStorage`
- Token automatically attached via Axios interceptor
- Global 401/403 handling with auto logout
- Protected routes + role-based route restrictions

## Notes

- Frontend uses requested endpoints and includes fallback compatibility for existing backend auth/registration routes.
- Base API URL is configurable via environment variable.
