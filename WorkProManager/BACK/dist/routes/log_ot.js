"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const log_ot_1 = require("../controllers/log_ot");
const router = (0, express_1.Router)();
router.get('/', log_ot_1.getLogs);
exports.default = router;
