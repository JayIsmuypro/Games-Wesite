import flask
from flask import Flask, render_template, request, session, jsonify, send_from_directory, redirect
from flask_socketio import SocketIO, emit, join_room, leave_room
from socketio import WSGIApp
import sqlite3
import os
import json
import gzip
import importlib.util
from datetime import datetime
import hmac
from functools import wraps
from dotenv import load_dotenv

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get('authenticated'):
            return redirect('/login')
        return f(*args, **kwargs)
    return decorated

# Absolute .env paths so config loads regardless of the working directory
# (PythonAnywhere starts the app from a different cwd).
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, '.env'))
load_dotenv(os.path.join(BASE_DIR, 'Ai.chatbot', '.env'), override=True)

# Load and normalize admin password from environment (fallback to 'water' for dev)
# Use strip() to remove accidental whitespace/newlines which can cause intermittent failures.
ADMIN_PASSWORD = (os.environ.get('ADMIN_PASSWORD', 'water') or 'water').strip()

app = Flask(__name__)
# Normalize SECRET_KEY if provided; fall back to a development default otherwise.
raw_secret = os.environ.get('SECRET_KEY')
app.secret_key = raw_secret.strip() if raw_secret and raw_secret.strip() else 'dev-only-change-in-production'
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 31536000  # Cache static assets for one year
app.config['JSON_SORT_KEYS'] = False

if app.secret_key == 'dev-only-change-in-production':
    print('Warning: SECRET_KEY is using the development default. Set SECRET_KEY in the environment to avoid session instability.')

# Initialize SocketIO with long-polling only (for PythonAnywhere free tier)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading', transports=['polling'])

# Expose a WSGI application object for PythonAnywhere deployment.
# PythonAnywhere web apps typically use the `application` variable in the WSGI file.
application = WSGIApp(socketio.server, app)

# Database configuration: use absolute path to avoid current-directory issues on PythonAnywhere.
DB_PATH = os.path.join(BASE_DIR, 'chat.db')

def get_db():
    """Get database connection"""
    db = sqlite3.connect(DB_PATH)
    db.row_factory = sqlite3.Row
    return db

def init_db():
    """Initialize the chat database"""
    db = get_db()
    db.execute('''
        CREATE TABLE IF NOT EXISTS chat_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            avatar TEXT NOT NULL,
            message TEXT NOT NULL,
            timestamp TEXT NOT NULL
        )
    ''')
    db.commit()
    db.close()

def get_recent_messages(limit=20):
    """Get the most recent chat messages"""
    db = get_db()
    cursor = db.execute(
        'SELECT id, username, avatar, message, timestamp FROM chat_messages ORDER BY id DESC LIMIT ?',
        (limit,)
    )
    messages = [dict(row) for row in cursor.fetchall()]
    db.close()
    # Return in ascending order (oldest first)
    return list(reversed(messages))

def save_message(username, avatar, message):
    """Save a chat message to the database"""
    db = get_db()
    timestamp = datetime.utcnow().isoformat() + 'Z'
    db.execute(
        'INSERT INTO chat_messages (username, avatar, message, timestamp) VALUES (?, ?, ?, ?)',
        (username, avatar, message, timestamp)
    )
    db.commit()
    db.close()
    return timestamp

# Initialize database on startup
init_db()

# Game storage helpers

def get_game_storage_dir():
    return os.path.join(BASE_DIR, 'game_storage')


def get_game_config_path():
    return os.path.join(get_game_storage_dir(), 'game_config.json')


def load_game_config():
    config_path = get_game_config_path()
    if not os.path.exists(config_path):
        return []
    with open(config_path, 'r', encoding='utf-8') as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []


def save_game_config(config):
    config_path = get_game_config_path()
    with open(config_path, 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=2)


@app.route('/game_storage/<path:filename>')
def serve_game_storage(filename):
    return send_from_directory(get_game_storage_dir(), filename)


@app.route('/api/game-files', methods=['GET'])
def api_game_files():
    directory = get_game_storage_dir()
    try:
        files = [name for name in os.listdir(directory) if name.lower().endswith('.html')]
        files.sort()
        return jsonify(files)
    except OSError:
        return jsonify([])


@app.route('/api/game-config', methods=['GET', 'POST'])
def api_game_config():
    if request.method == 'GET':
        return jsonify(load_game_config())

    if not session.get('authenticated'):
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json(silent=True)
    if not isinstance(data, list):
        return jsonify({'error': 'Invalid game configuration format'}), 400

    save_game_config(data)
    return jsonify({'success': True, 'data': data})


API_KEY_HELP = (
    'API_KEY is not set. Add it to .env in the project root '
    '(or Ai.chatbot/.env) as API_KEY=your-key, then restart the app.'
)


def get_gemini_api_key():
    """Read the Gemini key from the environment loaded at startup."""
    return os.getenv('API_KEY')


def load_ai_chatbot_module():
    ai_chatbot_path = os.path.join(BASE_DIR, 'Ai.chatbot', 'chatbot.py')
    if not os.path.exists(ai_chatbot_path):
        raise FileNotFoundError(f"AI chatbot module not found at {ai_chatbot_path}")

    spec = importlib.util.spec_from_file_location("ai_chatbot", ai_chatbot_path)
    ai_chatbot = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(ai_chatbot)
    return ai_chatbot


@app.route('/ai-chat', methods=['GET', 'POST'])
def ai_chat():
    message = ''
    ai_response = None
    error = None

    if request.method == 'POST':
        message = request.form.get('message', '').strip()
        if not message:
            error = 'Please enter a message to send to the AI chatbot.'
        else:
            api_key = get_gemini_api_key()
            if not api_key:
                error = API_KEY_HELP
            else:
                try:
                    ai_chatbot = load_ai_chatbot_module()
                    ai_response = ai_chatbot.chat_bot_with_gemini_api(message, api_key)
                except Exception as exc:
                    error = str(exc)

    return render_template('ai_chat.html', message=message, ai_response=ai_response, error=error)


def get_website_chat_prompt(user_message=None):
    base_prompt = (
        "You are an AI assistant for a website that offers learning content, courses, and practice challenges. "
        "Explain the site's features clearly, describe how visitors can use the courses, practice areas, and AI support, "
        "and keep the tone friendly and helpful."
    )
    if user_message:
        return f"{base_prompt}\n\nUser: {user_message}"
    return f"{base_prompt}\n\nUser: Tell me about this website and how it helps learners."


@app.route('/api/ai-chat', methods=['POST'])
def api_ai_chat():
    data = request.get_json(silent=True) or {}
    message = (data.get('message') or '').strip()
    if not message:
        return jsonify({'success': False, 'error': 'Message is required.'}), 400

    api_key = get_gemini_api_key()
    if not api_key:
        return jsonify({'success': False, 'error': API_KEY_HELP}), 500

    try:
        ai_chatbot = load_ai_chatbot_module()
        prompt = get_website_chat_prompt(message)
        ai_response = ai_chatbot.chat_bot_with_gemini_api(prompt, api_key)
        return jsonify({'success': True, 'response': ai_response})
    except Exception as exc:
        return jsonify({'success': False, 'error': str(exc)}), 500


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route("/privacy")
def privacy():
    return render_template("privacy.html")


@app.route("/python-course")
def python_course():
    return render_template("python-course.html")


@app.route("/design-fundamentals")
def design_fundamentals():
    return render_template("design-fundamentals.html")


@app.route("/practice-challenges")
def practice_challenges():
    return render_template("practice-challenges.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if session.get('authenticated'):
        return redirect('/learn')

    error = None
    if request.method == "POST":
        password = request.form.get("password", "").strip()
        # Use a constant-time comparison to avoid timing-related issues
        if password and hmac.compare_digest(password, ADMIN_PASSWORD):
            session['authenticated'] = True
            username = request.form.get('username', '').strip() or None
            if username:
                session['username'] = username
            return redirect('/learn')
        error = "Invalid password. Please try again."

    return render_template("login.html", error=error)


@app.route('/logout')
def logout():
    session.pop('authenticated', None)
    return redirect('/login')


@app.route('/learn')
@requires_auth
def pro():
    # Get username from session or generate a random one
    username = session.get('username')
    if not username:
        # Generate a random username for this session
        import random
        adjectives = ['Happy', 'Cool', 'Brave', 'Swift', 'Clever', 'Bold', 'Epic', 'Pro']
        nouns = ['Gamer', 'Player', 'User', 'Ninja', 'Hero', 'Star', 'Ace', 'Champ']
        username = f"{random.choice(adjectives)}{random.choice(nouns)}{random.randint(1, 999)}"
        session['username'] = username
    
    return render_template('pro.html', username=username)


# API endpoint to get recent chat messages
@app.route('/api/chat/messages', methods=['GET'])
def api_get_messages():
    """Get recent chat messages"""
    limit = request.args.get('limit', 20, type=int)
    if limit > 50:
        limit = 50
    messages = get_recent_messages(limit)
    return jsonify(messages)


# SocketIO events for real-time chat
@socketio.on('connect')
def handle_connect():
    """Handle client connection"""
    print(f'Client connected: {request.sid}')
    # Auto-join the global chat room
    join_room('global_chat')


@socketio.on('disconnect')
def handle_disconnect():
    """Handle client disconnection"""
    print(f'Client disconnected: {request.sid}')
    leave_room('global_chat')


@socketio.on('join_chat')
def handle_join_chat(data):
    """Handle client joining the chat"""
    username = data.get('username', 'Anonymous')
    session['username'] = username
    join_room('global_chat')
    print(f'{username} joined the chat')
    
    # Send recent messages to the user
    recent_messages = get_recent_messages(20)
    emit('chat_history', {'messages': recent_messages})


@socketio.on('send_message')
def handle_send_message(data):
    """Handle incoming chat message"""
    username = data.get('username', 'Anonymous')
    avatar = data.get('avatar', 'A')
    message = data.get('message', '').strip()
    
    if not message:
        return
    
    # Limit message length
    if len(message) > 500:
        message = message[:500]
    
    # Save to database
    timestamp = save_message(username, avatar, message)
    
    # Broadcast to all connected clients
    emit('new_message', {
        'username': username,
        'avatar': avatar,
        'message': message,
        'timestamp': timestamp
    }, broadcast=True, room='global_chat')
    
    print(f'[{username}]: {message}')


@socketio.on('typing')
def handle_typing(data):
    """Handle typing indicator"""
    username = data.get('username', 'Anonymous')
    emit('user_typing', {'username': username}, broadcast=True, room='global_chat')


@app.after_request
def apply_response_optimizations(response):
    """Apply compression and caching headers for faster page loads."""
    path = request.path
    accept_encoding = request.headers.get('Accept-Encoding', '')

    if path.startswith('/static/'):
        response.cache_control.public = True
        response.cache_control.max_age = 31536000
        response.cache_control.immutable = True
    elif response.content_type and response.content_type.startswith('text/html'):
        response.cache_control.public = True
        response.cache_control.max_age = 600

    if response.direct_passthrough or response.is_streamed:
        return response

    if 'gzip' in accept_encoding.lower() and response.status_code == 200:
        content_type = response.headers.get('Content-Type', '')
        if response.headers.get('Content-Encoding', '') == 'gzip':
            return response
        if any(mime in content_type for mime in ('text/', 'application/javascript', 'application/json', 'image/svg+xml')):
            try:
                compressed = gzip.compress(response.get_data(), compresslevel=6)
            except RuntimeError:
                return response
            response.set_data(compressed)
            response.headers['Content-Encoding'] = 'gzip'
            response.headers['Vary'] = 'Accept-Encoding'
            response.headers['Content-Length'] = len(compressed)
    return response


if __name__ == "__main__":
    # Run with SocketIO server
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)