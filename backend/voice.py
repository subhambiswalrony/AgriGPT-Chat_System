from faster_whisper import WhisperModel
from pydub import AudioSegment
import tempfile
import os

from services.llm_service import get_ai_response
from services.db_service import save_chat

# -----------------------------
# Whisper Model (FREE, OFFLINE)
# -----------------------------
whisper_model = WhisperModel(
    model_size_or_path="tiny",
    device="cpu",
    compute_type="int8"
)

# -----------------------------
# Language-wise fallback messages
# -----------------------------
FALLBACK_MESSAGES = {
    "hi": "🌾 मैं AgriGPT हूँ और मैं केवल कृषि और खेती से संबंधित प्रश्नों में सहायता करता हूँ।",
    "bn": "🌾 আমি AgriGPT এবং আমি শুধুমাত্র কৃষি ও চাষাবাদ সংক্রান্ত প্রশ্নে সহায়তা করি।",
    "ta": "🌾 நான் AgriGPT மற்றும் நான் வேளாண்மை தொடர்பான கேள்விகளுக்கு மட்டுமே உதவுகிறேன்।",
    "te": "🌾 నేను AgriGPT మరియు నేను వ్యవసాయం సంబంధించిన ప్రశ్నలకు మాత్రమే సహాయం చేస్తాను।",
    "or": "🌾 ମୁଁ AgriGPT ଏବଂ ମୁଁ କେବଳ କୃଷି ସମ୍ବନ୍ଧୀୟ ପ୍ରଶ୍ନରେ ସହାୟତା କରେ।",
    "mr": "🌾 मी AgriGPT आहे आणि मी फक्त शेतीसंबंधित प्रश्नांमध्येच मदत करतो।",
    "gu": "🌾 હું AgriGPT છું અને હું માત્ર ખેતી સંબંધિત પ્રશ્નોમાં મદદ કરું છું।",
    "pa": "🌾 ਮੈਂ AgriGPT ਹਾਂ ਅਤੇ ਮੈਂ ਸਿਰਫ਼ ਖੇਤੀਬਾੜੀ ਨਾਲ ਸੰਬੰਧਿਤ ਸਵਾਲਾਂ ਵਿੱਚ ਹੀ ਮਦਦ ਕਰਦਾ ਹਾਂ।",
    "ur": "🌾 میں AgriGPT ہوں اور میں صرف زراعت سے متعلق سوالات میں مدد کرتا ہوں۔",
    "as": "🌾 মই AgriGPT আৰু মই কেৱল কৃষি সম্পৰ্কীয় প্ৰশ্নত সহায় কৰোঁ।",
    "en": "🌾 I am AgriGPT and I only assist with agricultural and farming-related queries."
}

# -----------------------------
# AI-based agriculture check
# -----------------------------
def is_agriculture_query_ai(text: str) -> bool:
    prompt = f"""
Answer ONLY YES or NO.

Is the following query related to agriculture, farming, crops, soil,
irrigation, fertilizers, pests, or weather impact on farming?

Query:
{text}
"""
    result = get_ai_response(prompt).strip().upper()
    return result.startswith("YES")

# -----------------------------
# Voice Handler
# -----------------------------
def handle_voice(audio_file, user_id):
    """
    Voice → Native text → AI domain check → AI response / fallback
    """

    try:
        # Save uploaded audio temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp:
            audio_path = temp.name
            audio_file.save(audio_path)

        # Ensure WAV format
        audio = AudioSegment.from_file(audio_path)
        audio.export(audio_path, format="wav")

        # Whisper transcription
        segments, info = whisper_model.transcribe(audio_path)
        user_text = " ".join(s.text for s in segments).strip()

        language_code = info.language or "en"

        # Empty input
        if not user_text:
            response = FALLBACK_MESSAGES["en"]
            response_type = "fallback"

        # AI-based domain validation
        elif not is_agriculture_query_ai(user_text):
            response = FALLBACK_MESSAGES.get(language_code, FALLBACK_MESSAGES["en"])
            response_type = "fallback"

        else:
            # Agriculture query → AI response
            ai_prompt = f"Respond ONLY in the same language.\n\n{user_text}"
            response = get_ai_response(ai_prompt)
            response_type = "ai"

        # Save to MongoDB (voice input)
        save_chat(
            user_id=user_id,
            question=user_text,
            answer=response,
            response_type=response_type,
            language=language_code,
            input_type="voice"
        )

        return {
            "user_text": user_text,
            "ai_reply": response,
            "response_type": response_type,
            "language": language_code
        }

    except Exception as e:
        return {
            "error": "Voice processing failed",
            "details": str(e)
        }

    finally:
        if os.path.exists(audio_path):
            os.remove(audio_path)
