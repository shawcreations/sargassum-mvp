from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..schemas.ai import ChatRequest, ChatResponse
from ..services.ai import AIService
from ..database import get_db

router = APIRouter(tags=["AI Assistant"])


@router.post("/ai/chat", response_model=ChatResponse)
def chat(request: ChatRequest, db: Session = Depends(get_db)):
    """
    AI Chat endpoint.
    Accepts user messages and returns AI-generated responses.
    Uses OpenAI if OPENAI_API_KEY is set, otherwise returns a stub.
    Includes real-time risk data context for risk-related questions.
    """
    response = AIService.generate_response(message=request.message, db=db)
    return ChatResponse(assistant=response)
