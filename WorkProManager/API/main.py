from fastapi import FastAPI, HTTPException
from components import router as components_router

app = FastAPI()


app.include_router(components_router, prefix="/api", tags=["Insumos"])


@app.get("/")
def read_root():
    return {"message": """ Bienvenido a la API de Insumos."""}
