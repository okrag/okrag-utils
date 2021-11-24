"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Function = exports.CreateFunction = void 0;
require("reflect-metadata");
function CreateFunction(f, types) {
    return ((...args) => {
        args.forEach((arg, i) => {
            const currentType = types[i];
            throw new TypeError(`Argument should be a ${currentType.name}`);
        });
        return f(...args);
    });
}
exports.CreateFunction = CreateFunction;
function Function() {
    return function (target, propertyKey, descriptor) {
        return Object.assign(Object.assign({}, descriptor), { value: CreateFunction(descriptor.value, Reflect.getMetadata("design:paramtypes", target, propertyKey)) });
    };
}
exports.Function = Function;
//# sourceMappingURL=index.js.map