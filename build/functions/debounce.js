"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
const debounce = (func) => {
    let timeout = null;
    const debounced = ((...args) => {
        if (timeout)
            clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, 1000);
    });
    debounced.clear = () => {
        if (timeout)
            clearTimeout(timeout);
    };
    return debounced;
};
exports.debounce = debounce;
//# sourceMappingURL=debounce.js.map