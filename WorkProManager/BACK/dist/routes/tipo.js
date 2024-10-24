"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipo_1 = require("../controllers/tipo");
const router = (0, express_1.Router)();
router.get('/', tipo_1.getTipos);
router.get('/:id', tipo_1.getTipo);
router.post('/', tipo_1.postTipo);
router.put('/:id', tipo_1.updateTipo);
router.delete('/:id', tipo_1.deleteTipo);
exports.default = router;
