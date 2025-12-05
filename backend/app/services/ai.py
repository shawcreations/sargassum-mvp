import uuid
from typing import Optional
from ..config import settings


class AIService:
    """
    AI Service stub for OpenAI integration.
    Replace with actual OpenAI calls when ready.
    """
    
    @staticmethod
    def generate_response(message: str, conversation_id: Optional[str] = None) -> dict:
        """
        Stub implementation - returns predefined responses.
        TODO: Integrate with OpenAI API
        """
        if not conversation_id:
            conversation_id = str(uuid.uuid4())
        
        # Predefined responses for demo
        responses = {
            "hello": "Hello! I'm your Sargassum monitoring assistant. How can I help you today?",
            "help": "I can help you with:\n- Checking sargassum levels at beaches\n- Managing cleanup campaigns\n- Analyzing trends and patterns\n- Coordinating volunteer efforts\n\nWhat would you like to know?",
            "status": "Current sargassum status:\n- High risk: 2 beaches\n- Medium risk: 5 beaches\n- Low risk: 8 beaches\n\nWould you like more details about any specific beach?",
            "default": f"I understand you're asking about: '{message}'\n\nThis is a demo response. In production, I'll be connected to OpenAI to provide intelligent assistance for sargassum monitoring and management."
        }
        
        message_lower = message.lower()
        
        if "hello" in message_lower or "hi" in message_lower:
            response = responses["hello"]
        elif "help" in message_lower:
            response = responses["help"]
        elif "status" in message_lower:
            response = responses["status"]
        else:
            response = responses["default"]
        
        return {
            "response": response,
            "conversation_id": conversation_id
        }

