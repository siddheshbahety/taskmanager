from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import tasks, auth

from .database import engine
from . import models
from .routes import tasks

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(tasks.router)
