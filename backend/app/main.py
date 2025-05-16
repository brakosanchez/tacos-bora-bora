from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from motor.motor_asyncio import AsyncIOMotorClient
from .core.config import settings
from .routers import auth, users, menu, orders, comments, feedback

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(settings.MONGODB_URI)
    app.mongodb = app.mongodb_client[settings.MONGODB_DB]

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

# Include routers
app.include_router(
    auth.router,
    prefix=f"{settings.API_V1_STR}/auth",
    tags=["auth"]
)

app.include_router(
    users.router,
    prefix=f"{settings.API_V1_STR}/users",
    tags=["users"]
)

app.include_router(
    menu.router,
    prefix=f"{settings.API_V1_STR}/menu",
    tags=["menu"]
)

app.include_router(
    orders.router,
    prefix=f"{settings.API_V1_STR}/orders",
    tags=["orders"]
)

app.include_router(
    comments.router,
    prefix=f"{settings.API_V1_STR}/comments",
    tags=["comments"]
)

app.include_router(
    feedback.router,
    prefix=f"{settings.API_V1_STR}/feedback",
    tags=["feedback"]
)
