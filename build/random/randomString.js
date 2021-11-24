"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const choice_1 = __importDefault(require("./choice"));
exports.default = (random) => (characters, length) => {
    const randomChoice = choice_1.default(random);
    let string = "";
    const charactersArray = characters.split("");
    for (let i = 0; i < length; i++) {
        string += randomChoice(charactersArray);
    }
    return string;
};
//# sourceMappingURL=randomString.js.map