"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("../dto/material");
const mongoose_1 = require("../decorators/mongoose");
const mongoose_2 = require("./base/mongoose");
;
class MaterialRepository extends mongoose_2.default {
    constructor(conn) {
        super(mongoose_1.buildModel(conn, material_1.Material));
    }
}
exports.MaterialRepository = MaterialRepository;
;
//# sourceMappingURL=material.js.map