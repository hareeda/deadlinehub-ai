from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.assignment_router import router as assignment_router

app = FastAPI(title="DeadlineHub AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(assignment_router)


@app.get("/")
def health():
    return {
        "status": "running",
        "application": "DeadlineHub AI",
    }