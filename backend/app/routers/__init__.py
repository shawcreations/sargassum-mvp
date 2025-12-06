from .auth import router as auth_router
from .beaches import router as beaches_router
from .campaigns import router as campaigns_router
from .tasks import router as tasks_router
from .ai import router as ai_router
from .risk import router as risk_router
from .sat_layers import router as sat_layers_router

__all__ = [
    "auth_router", "beaches_router", "campaigns_router", 
    "tasks_router", "ai_router", "risk_router", "sat_layers_router"
]
