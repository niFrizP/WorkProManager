"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlador_1 = require("../controllers/controlador"); // Asegúrate de importar los controladores correctos
const router = (0, express_1.Router)();
// Ruta para obtener todos los trabajadores
router.get('/', controlador_1.getTrabajadores);
// Ruta para obtener un trabajador por su ID
router.get('/:id', controlador_1.getTrabajador);
// Ruta para crear un nuevo trabajador
router.post('/', controlador_1.postTrabajador);
// Ruta para actualizar un trabajador por su ID
router.put('/:id', controlador_1.updateTrabajador);
// Ruta para eliminar un trabajador por su ID
router.delete('/:id', controlador_1.deleteTrabajador);
exports.default = router;
