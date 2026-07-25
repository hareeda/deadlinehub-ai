from fastapi import FastAPI
from app.database.supabase import supabase

app = FastAPI(title="DeadlineHub AI")


@app.get("/")
def health():
    return {
        "status": "running",
        "application": "DeadlineHub AI"
    }


@app.get("/health/db")
def database_health():
    try:
        # Simple request to verify connectivity
        supabase.table("pg_tables").select("*").limit(1).execute()

        return {
            "database": "connected"
        }

    except Exception as e:
        return {
            "database": "failed",
            "error": str(e)
        }