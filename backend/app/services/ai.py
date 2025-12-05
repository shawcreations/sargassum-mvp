from ..config import settings


class AIService:
    """
    AI Service for OpenAI integration.
    """
    
    @staticmethod
    def generate_response(message: str) -> str:
        """
        Generate AI response using OpenAI if API key is available.
        """
        if not settings.OPENAI_API_KEY:
            return "This is a stub AI response because OPENAI_API_KEY is not set."
        
        try:
            from openai import OpenAI
            
            client = OpenAI(api_key=settings.OPENAI_API_KEY)
            
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {
                        "role": "system",
                        "content": "You are an assistant helping Vincy GreenRoots plan sargassum operations. You help with beach cleanup scheduling, campaign management, task coordination, and provide advice on sargassum management best practices."
                    },
                    {
                        "role": "user",
                        "content": message
                    }
                ],
                max_tokens=1000,
                temperature=0.7
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            return f"Error calling OpenAI API: {str(e)}"
