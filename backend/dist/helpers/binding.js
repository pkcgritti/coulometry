"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Vincula métodos de uma classe a ela mesma
 * @param {Object} self Objeto instanciado
 */
function autoBind(self) {
    for (const key of Object.getOwnPropertyNames(self.constructor.prototype)) {
        const val = self[key];
        if (key !== 'constructor' && typeof val === 'function') {
            self[key] = val.bind(self);
        }
    }
}
exports.autoBind = autoBind;
//# sourceMappingURL=binding.js.map