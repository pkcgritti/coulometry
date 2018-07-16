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
let Element = class Element {
};
__decorate([
    mongoose_2.prop({ required: true }),
    __metadata("design:type", String)
], Element.prototype, "name", void 0);
__decorate([
    mongoose_2.prop({ required: true }),
    __metadata("design:type", Number)
], Element.prototype, "molarMass", void 0);
__decorate([
    mongoose_2.prop({ required: true }),
    __metadata("design:type", Number)
], Element.prototype, "density", void 0);
__decorate([
    mongoose_2.prop({ required: true }),
    __metadata("design:type", mongoose_1.Schema.Types.ObjectId)
], Element.prototype, "material", void 0);
Element = __decorate([
    mongoose_2.collection('Elements')
], Element);
exports.Element = Element;
//# sourceMappingURL=element.js.map