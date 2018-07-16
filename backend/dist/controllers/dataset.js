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
const axios_1 = require("axios");
const mongoose_1 = require("mongoose");
class DatasetController extends controller_1.Controller {
    listDatasets() {
        return repositories_1.default.Dataset.find({}, {
            name: 1,
            processed: 1,
            material: 1,
            uploaded: 1
        });
    }
    getDataset(id) {
        return repositories_1.default.Dataset.findOne({
            _id: mongoose_1.Types.ObjectId(id)
        });
    }
    // Change to PUT
    addPoint(id) {
        return axios_1.default.get('http://localhost:8001/add_point?id=' + id)
            .then(response => {
            return repositories_1.default.Dataset.updateOne({
                _id: mongoose_1.Types.ObjectId(id)
            }, {
                $push: {
                    results: response.data
                }
            }).then(() => {
                return response.data;
            });
        })
            .catch(error => {
            console.log('Error', error.response.data);
            return {};
        });
    }
    removePoint(id) {
        return repositories_1.default.Dataset.updateOne({
            _id: mongoose_1.Types.ObjectId(id)
        }, {
            $pop: {
                results: 1
            }
        });
    }
    togglePoint(id, index) {
        const query = { _id: mongoose_1.Types.ObjectId(id) };
        const number = Number.parseInt(index);
        return repositories_1.default.Dataset.findOne(query)
            .then(dataset => {
            let ignore = dataset.ignore;
            if (dataset.ignore.indexOf(number) > -1) {
                ignore = dataset.ignore.filter(x => x !== number);
            }
            else {
                ignore.push(number);
            }
            return repositories_1.default.Dataset.updateOne(query, { $set: { ignore } });
        });
    }
    createDataset(dataset) {
        return repositories_1.default.Dataset.createOne(dataset);
    }
    deleteDataset(id) {
        return repositories_1.default.Dataset.deleteOne({
            _id: mongoose_1.Types.ObjectId(id)
        });
    }
}
__decorate([
    router_1.GET('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DatasetController.prototype, "listDatasets", null);
__decorate([
    router_1.GET('/:id', req => [req.params.id]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DatasetController.prototype, "getDataset", null);
__decorate([
    router_1.GET('/:id/addpoint', req => [req.params.id]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DatasetController.prototype, "addPoint", null);
__decorate([
    router_1.GET('/:id/removepoint', req => [req.params.id]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DatasetController.prototype, "removePoint", null);
__decorate([
    router_1.GET('/:id/togglepoint/:index', req => [req.params.id, req.params.index]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DatasetController.prototype, "togglePoint", null);
__decorate([
    router_1.POST('/', req => [req.body]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DatasetController.prototype, "createDataset", null);
__decorate([
    router_1.DELETE('/:id', req => [req.params.id]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DatasetController.prototype, "deleteDataset", null);
exports.DatasetController = DatasetController;
;
//# sourceMappingURL=dataset.js.map