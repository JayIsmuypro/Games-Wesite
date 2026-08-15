# SkyHigh Learning

A Flask site with two halves: a public learning front-end (courses, design fundamentals, practice challenges) and a password-gated **Game Launcher** at `/learn` featuring a browser game library and a real-time global chat.

## Features

- **Learning pages** — Python course, design fundamentals, and practice challenges, served from Jinja templates.
- **Game launcher** (`/learn`, login required) — up to 50 configurable game slots backed by standalone HTML games in `game_storage/`.
- **Real-time chat** — Socket.IO global room with message history persisted to SQLite, typing indicators, and a 500-character message cap.
- **AI assistant** — Gemini-backed chatbot available as a page (`/ai-chat`) and a JSON endpoint (`/api/ai-chat`).
- **Response optimization** — gzip compression and long-lived cache headers for static assets.

## Requirements

- Python 3.9+
- Dependencies in [requirements.txt](requirements.txt)

## Setup

```bash
pip install -r requirements.txt
```

Create a `.env` file in the **project root**:

```
SECRET_KEY=<a long random string>
ADMIN_PASSWORD=<your admin password>
API_KEY=<your Gemini API key>
```

`API_KEY` powers the AI chatbot. Both `app.py` and `Ai.chatbot/chatbot.py` load the
root `.env` using an absolute path, so the key resolves no matter which directory
you launch from.

An optional `Ai.chatbot/.env` is also loaded if present and **overrides** the root
values — handy for testing a different key without touching the main file. It is
not required.

`.env` is gitignored — never commit real keys. Restart the app after changing it.

## Running locally

```bash
python app.py
```

The app starts on <http://localhost:5000> with debug mode on and Socket.IO running via the threading async worker.

## Project layout

```
app.py                  Flask app: routes, Socket.IO events, SQLite chat store
chat.db                 SQLite database (auto-created on startup)
requirements.txt        Python dependencies
templates/              Jinja templates for every page
static/css              styles.css (public site), pro.css (launcher)
static/js               main.js (public site), pro.js (launcher + chat client)
static/images           Site imagery
game_storage/           Standalone game HTML files + game_config.json
Ai.chatbot/             Gemini chatbot module (chatbot.py) and experiments
TODO.md                 Working notes
```

## Routes

| Route | Method | Description |
| --- | --- | --- |
| `/` | GET | Home page |
| `/about`, `/contact`, `/privacy` | GET | Static content pages |
| `/python-course` | GET | Python course |
| `/design-fundamentals` | GET | Design fundamentals course |
| `/practice-challenges` | GET | Practice challenges |
| `/login` | GET, POST | Admin login (sets session, redirects to `/learn`) |
| `/logout` | GET | Clears the session |
| `/learn` | GET | Game launcher — **auth required** |
| `/ai-chat` | GET, POST | AI chatbot page |
| `/api/ai-chat` | POST | `{"message": "..."}` → `{"success", "response"}` |
| `/api/chat/messages` | GET | Recent chat messages (`?limit=`, capped at 50) |
| `/api/game-files` | GET | Lists `.html` files in `game_storage/` |
| `/api/game-config` | GET | Current game slot configuration |
| `/api/game-config` | POST | Replaces the configuration — **auth required** |
| `/game_storage/<file>` | GET | Serves a game file |

### Socket.IO events

| Event | Direction | Payload |
| --- | --- | --- |
| `join_chat` | client → server | `{username}` — joins the global room, replies with `chat_history` |
| `send_message` | client → server | `{username, avatar, message}` — persists and broadcasts |
| `typing` | client → server | `{username}` — broadcasts `user_typing` |
| `chat_history` | server → client | `{messages: [...]}` — last 20 messages |
| `new_message` | server → client | `{username, avatar, message, timestamp}` |

## Adding a game

1. Drop a self-contained `.html` file into `game_storage/`.
2. Edit `game_storage/game_config.json` and fill in an empty slot:

```json
{
  "id": 3,
  "title": "My Game",
  "description": "What it is",
  "image": "https://example.com/thumbnail.png",
  "file": "my_game.html",
  "status": "available"
}
```

Alternatively, POST the full config array to `/api/game-config` while logged in.

## Deployment (PythonAnywhere)

`app.py` exposes an `application` WSGI object for PythonAnywhere's WSGI file. Socket.IO is configured for **long-polling only** (`transports=['polling']`) because the free tier doesn't support WebSockets. The database path is resolved absolutely from `BASE_DIR`, so the working directory doesn't matter.

Set `SECRET_KEY`, `ADMIN_PASSWORD`, and `API_KEY` as environment variables in your hosting config. Real environment variables take precedence over `.env` files, since `load_dotenv` does not override what is already set.

## Security notes

- `ADMIN_PASSWORD` and `SECRET_KEY` fall back to weak development defaults if unset. **Always** set both before deploying.
- Authentication is a single shared password with no rate limiting — treat `/learn` as obscurity, not security.
- `cors_allowed_origins="*"` on the Socket.IO server allows connections from any origin. Tighten it if the site goes public.
