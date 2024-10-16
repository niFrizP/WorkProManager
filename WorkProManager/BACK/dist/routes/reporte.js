"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Ensure the path and file name are correct
const reporte_1 = require("../controllers/reporte");
const router = (0, express_1.Router)();
router.post('/', reporte_1.postReporte);
router.get('/', reporte_1.getReportes);
router.get('/:id', reporte_1.getReporte);
router.delete('/:id', reporte_1.deleteReporte);
router.put('/:id', reporte_1.updateReporte);
exports.default = router;
