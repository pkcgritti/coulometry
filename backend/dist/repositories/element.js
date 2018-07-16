"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const element_1 = require("../dto/element");
const mongoose_1 = require("../decorators/mongoose");
const mongoose_2 = require("./base/mongoose");
;
class ElementRepository extends mongoose_2.default {
    constructor(conn) {
        super(mongoose_1.buildModel(conn, element_1.Element));
    }
}
exports.ElementRepository = ElementRepository;
;
//# sourceMappingURL=element.js.map