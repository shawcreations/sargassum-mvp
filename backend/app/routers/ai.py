from fastapi import APIRouter
from ..schemas.ai import ChatRequest, ChatResponse
from ..services.ai import AIService

router = APIRouter(tags=["AI Assistant"])


@router.post("/ai/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    """
    AI Chat endpoint.
    Accepts user messages and returns AI-generated responses.
    Uses OpenAI if OPENAI_API_KEY is set, otherwise returns a stub.
    """
    response = AIService.generate_response(message=request.message)
    return ChatResponse(assistant=response)
