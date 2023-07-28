"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeNotFound = void 0;
var routeNotFound = function (req, res) {
    return res.json(404).json({ message: "No matching routes found." });
};
exports.routeNotFound = routeNotFound;
