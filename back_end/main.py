from decouple import config

import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from motor.motor_asyncio import AsyncIOMotorClient

from routers.spacecrafts import router as spacecrafts_router


DB_URL = config("DB_URL", cast=str)
DB_NAME = config("DB_NAME", cast=str)


# define origins
origins = ["*"]

# instantiate the app
app = FastAPI()

# add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(DB_URL)
    app.mongodb = app.mongodb_client[DB_NAME]


@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()


app.include_router(spacecrafts_router, prefix="/spacecrafts", tags=["spacecrafts"])

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)