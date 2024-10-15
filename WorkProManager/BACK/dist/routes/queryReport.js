"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Ensure the path and file name are correct
const queryReport_1 = require("../controllers/queryReport");
const router = (0, express_1.Router)();
router.post('/', queryReport_1.postReporte);
router.get('/', queryReport_1.getReportes);
router.get('/:id', queryReport_1.getReportes);
router.delete('/:id', queryReport_1.deleteReporte);
router.put('/:id', queryReport_1.updateReporte);
exports.default = router;
