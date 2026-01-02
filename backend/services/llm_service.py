import warnings
import google.generativeai as genai
from utils.config import GEMINI_API_KEY

# Suppress deprecation warning for now (TODO: migrate to google.genai in future)
warnings.filterwarnings('ignore', category=FutureWarning, module='google.generativeai')

genai.configure(api_key=GEMINI_API_KEY)

SYSTEM_PROMPT = """
You are AgriGPT 🌾, an agricultural expert chatbot designed to assist Indian farmers.

Your responsibilities:
- Answer ONLY questions related to agriculture and farming, including:
  crops, cultivation practices, fertilizers, soil types and composition,
  irrigation, pest and disease management, weather impact on farming,
  and Indian government agriculture schemes.

- CRITICAL LANGUAGE RULE: Respond in the SAME LANGUAGE as the user's question.
  NEVER mix languages in a single response. If the user asks in English, respond 
  COMPLETELY in English. If they ask in Hindi, respond COMPLETELY in Hindi.
  Support Indian languages such as Hindi, Odia, Bengali, Telugu, Tamil,
  Marathi, Kannada, Malayalam, Punjabi, and English.
  DO NOT translate or switch languages mid-response.

- If a user shares their state, region, or soil type, provide:
  • typical soil composition of that region
  • suitable crops for that soil and climate
  • fertilizer and nutrient recommendations

- Clearly explain which crops grow best in soil types such as:
  black soil, alluvial soil, red soil, laterite soil, sandy loam, etc.,
  and explain WHY they are suitable.

- When requested, provide detailed yet practical explanations
  using real-world examples that farmers can easily understand.

STRICT RULE:
If the user asks anything NOT related to agriculture or farming,
politely decline in the SAME LANGUAGE as the user by saying:

"I am AgriGPT 🌾 and I only assist with agricultural and farming-related queries."
"""

model = genai.GenerativeModel(
    model_name="gemini-2.5-flash",
    system_instruction=SYSTEM_PROMPT
)

def get_ai_response(prompt: str, chat_history: list = None) -> str:
    """
    Get AI response with optional conversation history.
    
    Args:
        prompt: The current user message
        chat_history: List of previous messages in format [{"role": "user"/"assistant", "message": "..."}]
    """
    try:
        if chat_history and len(chat_history) > 0:
            # Format history for Gemini API
            # Gemini expects: [{"role": "user", "parts": ["text"]}, {"role": "model", "parts": ["text"]}, ...]
            gemini_history = []
            for msg in chat_history:
                if msg["role"] == "user":
                    gemini_history.append({"role": "user", "parts": [msg["message"]]})
                elif msg["role"] == "assistant":
                    gemini_history.append({"role": "model", "parts": [msg["message"]]})
            
            # Start chat with history
            chat = model.start_chat(history=gemini_history)
            
            # Send current message with context
            response = chat.send_message(prompt)
        else:
            # No history, single message
            response = model.generate_content(prompt)
        
        return response.text.strip()
    except Exception as e:
        print(f"Error in get_ai_response: {str(e)}")
        return "🌾 I am AgriGPT 🌾 and I only assist with agricultural and farming-related queries."

"""For testing purpose"""

# if __name__ == "__main__":
#     print(get_ai_response("Best fertilizer for rice crop"))
#     print(get_ai_response("Tell me a joke"))
