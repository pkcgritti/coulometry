"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataset_1 = require("../dto/dataset");
const mongoose_1 = require("../decorators/mongoose");
const mongoose_2 = require("./base/mongoose");
;
class DatasetRepository extends mongoose_2.default {
    constructor(conn) {
        super(mongoose_1.buildModel(conn, dataset_1.Dataset));
    }
}
exports.DatasetRepository = DatasetRepository;
;
//# sourceMappingURL=dataset.js.map