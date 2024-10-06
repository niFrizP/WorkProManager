from pydantic import BaseModel
from typing import Optional

# Modelo del Insumo
class Insumo(BaseModel):
    id: Optional[int] = None  # El id es opcional porque se asignara al crear el insumo
    nombre: str
    descripcion: Optional[str] = None  # El campo de descripcion es opcional
    precio: float
    categoria: str
