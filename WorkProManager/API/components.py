from fastapi import APIRouter, HTTPException
from models import Insumo
from typing import List
import logging

router = APIRouter()

Insumos = []  # Lista vacía para almacenar los insumos

current_id = 0  # Variable para asignar un id a cada insumo


# Ruta para obtener todos los insumos
@router.get("/insumos/", response_model=List[Insumo])
def listar_Insumos():
    return Insumos


# Ruta para obtener un insumo por su id
@router.get("/insumos/{Insumo_id}", response_model=Insumo)
def obtener_Insumo(insumo_id: int):
    for insumo in Insumos:
        if insumo.id == insumo_id:
            return insumo
    raise HTTPException(status_code=404, detail="Insumo no encontrado")


# Ruta para crear un insumo
@router.post("/insumos/", response_model=Insumo)
def crear_Insumo(insumo: Insumo):
    global current_id

    # Asignar un id al insumo
    current_id += 1

    Insumos.append(insumo)
    return insumo


# Ruta para actualizar un insumo
@router.put("/insumos/{Insumo_id}", response_model=Insumo)
def actualizar_Insumo(insumo_id: int, updated_insumo: Insumo):
    for i in range(len(Insumos)):
        if Insumos[i].id == insumo_id:
            Insumos[i] = updated_insumo
            return updated_insumo
    raise HTTPException(status_code=404, detail="Insumo no encontrado")


# Ruta para eliminar un insumo
@router.delete("/insumos/{insumo_id}", response_model=Insumo)
def eliminar_insumo(insumo_id: int):
    logging.info(f"Intentando eliminar insumo con ID: {insumo_id}")
    logging.info(f"Estado actual de Insumos: {Insumos}")
    for i in range(len(Insumos)):
        if Insumos[i].id == insumo_id:
            insumo = Insumos[i]
            del Insumos[i]
            logging.info(f"Insumo Id {insumo} eliminado")
            return {
                "message": f"Insumo con ID {insumo_id} ha sido eliminado correctamente",
                "insumo": insumo
            }
    raise HTTPException(status_code=404, detail="Insumo no encontrado")
