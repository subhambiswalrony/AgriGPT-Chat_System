from faster_whisper import WhisperModel
from services.llm_service import get_ai_response
from services.db_service import save_chat
from langdetect import detect
from pydub import AudioSegment
import tempfile, os

whisper_model = WhisperModel("tiny", device="cpu", compute_type="int8")

LANG_MAP = {
    "en": "English", "hi": "Hindi", "bn": "Bengali", "or": "Odia",
    "ta": "Tamil", "te": "Telugu", "kn": "Kannada", "ml": "Malayalam",
    "mr": "Marathi", "gu": "Gujarati", "pa": "Punjabi", "ur": "Urdu"
}

def handle_voice(audio_file, user_id):
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as f:
            audio_file.save(f.name)
            path = f.name

        audio = AudioSegment.from_file(path)
        audio.export(path, format="wav")

        segments, _ = whisper_model.transcribe(path)
        user_text = " ".join(s.text for s in segments).strip()

        lang_code = detect(user_text)
        language = LANG_MAP.get(lang_code, "English")

        prompt = f"Respond ONLY in {language}.\n\n{user_text}"
        response = get_ai_response(prompt)

        response_type = "ai"
        if "only assist" in response.lower():
            response_type = "fallback"

        save_chat(user_id, user_text, response, response_type, language)

        return {
            "user_text": user_text,
            "ai_reply": response,
            "language": language
        }

    finally:
        if os.path.exists(path):
            os.remove(path)
