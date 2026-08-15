import os
from google import genai
from dotenv import load_dotenv

# Resolve .env paths from this file, not the current working directory, so the
# key loads whether we're started by Flask, Streamlit, or `python main.py`.
MODULE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(MODULE_DIR)

# Project root first, then Ai.chatbot/.env which overrides it if present.
load_dotenv(os.path.join(PROJECT_ROOT, ".env"))
load_dotenv(os.path.join(MODULE_DIR, ".env"), override=True)


def get_api_key(api_key=None):
    """Resolve the Gemini API key, preferring an explicitly passed value."""
    return api_key or os.getenv("API_KEY")

def simple_chatbot_if_elif_else(user_input):
    if user_input == "hello":
        return "Hello there!"
    elif user_input == "how are you":
        return "I'm doing well, thank you!"
    elif user_input == "what is your name":
        return "I am a simple chatbot."
    else:
        return "Sorry, I don't understand."
    

def chat_bot_with_gemini_api(user_input, api_key=None):
    # Resolved per call, not as a default argument, so a key loaded after this
    # module was imported is still picked up.
    api_key = get_api_key(api_key)
    if not api_key:
        raise RuntimeError(
            "API_KEY is not set. Add it to .env in the project root "
            "(or Ai.chatbot/.env) as API_KEY=your-key."
        )

    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[user_input],
    )
    return response.text