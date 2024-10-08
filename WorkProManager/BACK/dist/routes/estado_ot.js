"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estado_ot_1 = require("../controllers/estado_ot");
const router = (0, express_1.Router)();
router.get('/', estado_ot_1.getEstadosOT);
router.get('/:id', estado_ot_1.getEstadoOT);
router.delete('/:id', estado_ot_1.deleteEstadoOT);
router.post('/', estado_ot_1.postEstadoOT);
router.put('/:id', estado_ot_1.updateEstadoOT);
exports.default = router;