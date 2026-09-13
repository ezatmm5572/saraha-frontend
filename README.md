# Saraha Vue Frontend - Matched to Your Backend

This frontend was rebuilt specifically for the uploaded backend.

## Exact backend routes used

### Authentication
- POST `/user/signUp`
- POST `/user/signIn`
- GET `/user/profile`

### Messages
- POST `/messages/message/:userID`
- GET `/user/messages`

### AI
- GET `/ai/message-insights`

## Important backend response handling

### Sign in
Your backend returns:

```json
{
  "message": "login successfully",
  "data": {
    "token": "..."
  }
}
```

The frontend saves this token and then requests `/user/profile`.

### Profile
Your backend returns:

```json
{
  "message": "done",
  "data": {
    "user": {}
  }
}
```

The frontend saves the user object, including `_id`, and creates the public link:

`/message/:userID`

### Messages
Your backend returns:

```json
{
  "message": "Messages retrieved successfully",
  "messages": []
}
```

### AI
Your backend returns:

```json
{
  "message": "Messages analyzed successfully",
  "data": {
    "analysis": {
      "summary": "...",
      "sentiment": {},
      "topics": [],
      "commonWords": []
    }
  }
}
```

## Setup

```bash
npm install
```

Create `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Run:

```bash
npm run dev
```

## Backend

Your uploaded backend already uses:

```js
app.use(cors(), express.json())
```

So CORS should allow the Vite frontend during local development.
