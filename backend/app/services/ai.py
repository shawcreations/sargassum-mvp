from datetime import date, timedelta
from typing import Optional
from sqlalchemy.orm import Session
import httpx
import json

from ..config import settings
from .risk_helpers import (
    get_high_risk_beaches_for_date,
    get_beach_risk_timeseries,
    get_recent_alerts,
    get_risk_summary
)


class AIService:
    """
    AI Service for OpenAI integration with risk data context.
    """
    
    @staticmethod
    def get_risk_context(db: Session) -> str:
        """
        Build context string with current risk data for the AI.
        """
        try:
            # Get today's risk summary
            summary = get_risk_summary(db, date.today())
            
            # Get high risk beaches
            high_risk = get_high_risk_beaches_for_date(db, date.today(), min_risk_level=2)
            
            # Get recent alerts
            alerts = get_recent_alerts(db, limit=10)
            
            context = f"""
CURRENT SARGASSUM RISK DATA (as of {date.today()}):

Risk Summary:
- Total monitored beaches: {summary.get('total_beaches', 0)}
- High risk beaches: {summary.get('high_risk', 0)}
- Medium risk beaches: {summary.get('medium_risk', 0)}
- Low risk beaches: {summary.get('low_risk', 0)}
- Active alerts: {summary.get('active_alerts', 0)}

High/Medium Risk Beaches Today:
"""
            if high_risk:
                for b in high_risk[:10]:
                    risk_label = "HIGH" if b['risk_level'] == 3 else "MEDIUM"
                    context += f"- {b['beach_name']}: {risk_label} risk\n"
            else:
                context += "- No high/medium risk beaches detected today\n"
            
            context += "\nRecent Alerts:\n"
            if alerts:
                for a in alerts[:5]:
                    context += f"- [{a['alert_type']}] {a['beach_name']}: {a['message']}\n"
            else:
                context += "- No active alerts\n"
            
            return context
        except Exception as e:
            return f"\n[Unable to fetch current risk data: {str(e)}]\n"
    
    @staticmethod
    def generate_response(message: str, db: Optional[Session] = None) -> str:
        """
        Generate AI response using OpenAI if API key is available.
        Includes risk data context for risk-related questions.
        """
        # Check if question is risk-related
        risk_keywords = ['risk', 'alert', 'high', 'danger', 'priority', 'urgent', 
                        'sargassum level', 'which beach', 'worst', 'critical']
        is_risk_related = any(kw in message.lower() for kw in risk_keywords)
        
        # Build context if we have DB access and question is risk-related
        risk_context = ""
        if db and is_risk_related:
            risk_context = AIService.get_risk_context(db)
        
        if not settings.OPENAI_API_KEY:
            # Provide rule-based response when no API key
            if is_risk_related and db:
                try:
                    summary = get_risk_summary(db, date.today())
                    high_risk = get_high_risk_beaches_for_date(db, date.today(), min_risk_level=2)
                    
                    response = "AI services are temporarily unavailable. Here's the current risk status:\n\n"
                    response += f"📊 **Risk Summary for {date.today()}:**\n"
                    response += f"- High risk beaches: {summary.get('high_risk', 0)}\n"
                    response += f"- Medium risk beaches: {summary.get('medium_risk', 0)}\n"
                    response += f"- Active alerts: {summary.get('active_alerts', 0)}\n\n"
                    
                    if high_risk:
                        response += "**Priority Beaches:**\n"
                        for b in high_risk[:5]:
                            level = "🔴 HIGH" if b['risk_level'] == 3 else "🟠 MEDIUM"
                            response += f"- {b['beach_name']}: {level}\n"
                    
                    return response
                except:
                    pass
            
            return "This is a stub AI response because OPENAI_API_KEY is not set."
        
        try:
            from openai import OpenAI
            
            # Create client without proxy settings
            http_client = httpx.Client()
            client = OpenAI(
                api_key=settings.OPENAI_API_KEY,
                http_client=http_client
            )
            
            system_prompt = """You are an assistant helping Vincy GreenRoots plan sargassum operations. 
You help with beach cleanup scheduling, campaign management, task coordination, and provide advice on sargassum management best practices.

When discussing risk levels:
- Level 0 = No risk
- Level 1 = Low risk  
- Level 2 = Medium risk (requires monitoring)
- Level 3 = High risk (requires immediate attention)

Always prioritize high-risk beaches for cleanup operations.
"""
            
            if risk_context:
                system_prompt += f"\n{risk_context}"
            
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {
                        "role": "system",
                        "content": system_prompt
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
            
        except ImportError:
            return "OpenAI library is not installed. Please install it with: pip install openai"
        except Exception as e:
            error_msg = str(e)
            if "quota" in error_msg.lower() or "rate" in error_msg.lower():
                # Fallback for quota errors
                if db and is_risk_related:
                    try:
                        summary = get_risk_summary(db, date.today())
                        return f"AI services are temporarily unavailable due to rate limits. Current risk summary: {summary.get('high_risk', 0)} high-risk beaches, {summary.get('active_alerts', 0)} active alerts."
                    except:
                        pass
                return "AI services are temporarily unavailable. Please try again later."
            return f"Error calling OpenAI API: {error_msg}"
