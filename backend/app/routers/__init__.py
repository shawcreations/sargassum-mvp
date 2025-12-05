from .auth import router as auth_router
from .beaches import router as beaches_router
from .campaigns import router as campaigns_router
from .tasks import router as tasks_router
from .ai import router as ai_router

__all__ = ["auth_router", "beaches_router", "campaigns_router", "tasks_router", "ai_router"]

