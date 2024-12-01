"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marca_1 = require("../controllers/marca");
const router = (0, express_1.Router)();
router.get('/', marca_1.getMarcas);
router.get('/:id', marca_1.getMarcaById);
router.post('/', marca_1.createMarca);
router.put('/:id', marca_1.updateMarca);
router.delete('/:id', marca_1.deleteMarca);
exports.default = router;

