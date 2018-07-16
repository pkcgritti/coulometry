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
const router_1 = require("../decorators/router");
const controller_1 = require("./base/controller");
const repositories_1 = require("../repositories");
const mongoose_1 = require("mongoose");
function idQuery(id) {
    return {
        _id: mongoose_1.Types.ObjectId(id)
    };
}
class MaterialController extends controller_1.Controller {
    listMaterials() {
        return repositories_1.default.Material.find();
    }
    createMaterial(material) {
        return repositories_1.default.Material.createOne(material);
    }
    getMaterial(mid) {
        return repositories_1.default.Material.findOne(idQuery(mid));
    }
    updateMaterial(mid, material) {
        return repositories_1.default.Material.updateOne(idQuery(mid), {
            $set: material
        });
    }
    deleteMaterial(mid) {
        return repositories_1.default.Material.$findOne(idQuery(mid))
            .then(material => {
            if (!material)
                throw 404;
            return Promise.all(material.elements.map(e => {
                return repositories_1.default.Element.deleteOne(idQuery(e));
            })).then(() => {
                material.remove();
                return material;
            });
        });
    }
    listMaterialElements(mid) {
        return repositories_1.default.Material.$findOne(idQuery(mid))
            .then(material => {
            if (!material)
                throw 404;
            return Promise.all(material.elements.map(eid => {
                return repositories_1.default.Element.findOne(idQuery(eid));
            }));
        });
    }
    createMaterialElement(mid, element) {
        return repositories_1.default.Material.$findOne(idQuery(mid))
            .then(material => {
            if (!material)
                throw 404;
            element.material = material.id;
            return repositories_1.default.Element.createOne(element)
                .then(data => {
                material.elements.push(data._id);
                material.save();
                return data;
            });
        });
    }
    getMaterialElement(mid, eid) {
        return repositories_1.default.Material.findOne(idQuery(mid))
            .then(material => {
            if (!material)
                throw 404;
            return repositories_1.default.Element.findOne(idQuery(eid))
                .then(element => {
                if (!element)
                    throw 404;
                return element;
            });
        });
    }
    updateMaterialElement(mid, eid, element) {
        return repositories_1.default.Material.findOne(idQuery(mid))
            .then(material => {
            if (!material)
                throw 404;
            return repositories_1.default.Element.updateOne(idQuery(eid), {
                $set: element
            });
        });
    }
    deleteMaterialElement(mid, eid) {
        return repositories_1.default.Material.$findOne(idQuery(mid))
            .then(material => {
            if (!material)
                throw 404;
            return repositories_1.default.Element.$findOne(idQuery(eid))
                .then(element => {
                if (!element)
                    throw 404;
                element.remove();
                return element;
            });
        });
    }
}
__decorate([
    router_1.GET('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "listMaterials", null);
__decorate([
    router_1.POST('/', req => [req.body]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "createMaterial", null);
__decorate([
    router_1.GET('/:mid', req => [req.params.mid]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "getMaterial", null);
__decorate([
    router_1.PUT('/:mid', req => [req.params.mid, req.body]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "updateMaterial", null);
__decorate([
    router_1.DELETE('/:mid', req => [req.params.mid]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "deleteMaterial", null);
__decorate([
    router_1.GET('/:mid/elements', req => [req.params.mid]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "listMaterialElements", null);
__decorate([
    router_1.POST('/:mid/elements', req => [req.params.mid, req.body]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "createMaterialElement", null);
__decorate([
    router_1.GET('/:mid/element/:eid', req => [req.params.mid, req.params.eid]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "getMaterialElement", null);
__decorate([
    router_1.PUT('/:mid/element/:eid', req => [req.params.mid, req.params.eid, req.body]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "updateMaterialElement", null);
__decorate([
    router_1.DELETE('/:mid/element/:eid', req => [req.params.mid, req.params.eid]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MaterialController.prototype, "deleteMaterialElement", null);
exports.MaterialController = MaterialController;
;
//# sourceMappingURL=material.js.map