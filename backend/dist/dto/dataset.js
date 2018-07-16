"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("../decorators/mongoose");
let Dataset = class Dataset {
};
__decorate([
    mongoose_2.prop({ required: true }),
    __metadata("design:type", String)
], Dataset.prototype, "name", void 0);
__decorate([
    mongoose_2.prop({ default: false }),
    __metadata("design:type", Boolean)
], Dataset.prototype, "processed", void 0);
__decorate([
    mongoose_2.prop(),
    __metadata("design:type", mongoose_1.Schema.Types.ObjectId)
], Dataset.prototype, "material", void 0);
__decorate([
    mongoose_2.prop({ default: Date.now }),
    __metadata("design:type", Date)
], Dataset.prototype, "uploaded", void 0);
__decorate([
    mongoose_2.prop({ default: 0.0 }),
    __metadata("design:type", Number)
], Dataset.prototype, "startTime", void 0);
__decorate([
    mongoose_2.prop({ default: 0.1 }),
    __metadata("design:type", Number)
], Dataset.prototype, "samplingInterval", void 0);
__decorate([
    mongoose_2.prop({ default: 0.023 }),
    __metadata("design:type", Number)
], Dataset.prototype, "current", void 0);
__decorate([
    mongoose_2.prop({ default: {} }),
    __metadata("design:type", mongoose_1.Schema.Types.Mixed)
], Dataset.prototype, "details", void 0);
__decorate([
    mongoose_2.aprop(mongoose_1.Schema.Types.Mixed),
    __metadata("design:type", Array)
], Dataset.prototype, "results", void 0);
__decorate([
    mongoose_2.aprop(Number),
    __metadata("design:type", Array)
], Dataset.prototype, "ignore", void 0);
__decorate([
    mongoose_2.aprop(Number),
    __metadata("design:type", Array)
], Dataset.prototype, "voltage", void 0);
Dataset = __decorate([
    mongoose_2.collection('Datasets')
], Dataset);
exports.Dataset = Dataset;
//# sourceMappingURL=dataset.js.map