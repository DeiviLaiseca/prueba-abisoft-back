"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Data {
    constructor() { }
    static capitalize(text) {
        return text.charAt(0).toUpperCase() + text.toLowerCase().slice(1);
    }
}
exports.default = Data;
