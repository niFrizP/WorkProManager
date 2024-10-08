"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const servicio_1 = require("../controllers/servicio");
const router = (0, express_1.Router)();
router.get('/', servicio_1.getServicios);
router.get('/:id', servicio_1.getServicio);
router.delete('/:id', servicio_1.deleteServicio);
router.post('/', servicio_1.postServicio);
router.put('/:id', servicio_1.updateServicio);
exports.default = router;
