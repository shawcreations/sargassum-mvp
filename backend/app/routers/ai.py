from fastapi import APIRouter
from ..schemas.ai import ChatMessage, ChatResponse
from ..services.ai import AIService

router = APIRouter(prefix="/ai", tags=["AI Assistant"])


@router.post("/chat", response_model=ChatResponse)
def chat(message: ChatMessage):
    """
    AI Chat endpoint - stub implementation.
    Accepts user messages and returns AI-generated responses.
    """
    result = AIService.generate_response(
        message=message.message,
        conversation_id=message.conversation_id
    )
    return ChatResponse(**result)

