"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.login = exports.validateToken = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var client_1 = require("@prisma/client");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var prisma = new client_1.PrismaClient();
var validateToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.userId;
                return [4 /*yield*/, prisma.user.findUnique({
                        where: {
                            id: userId,
                        },
                        include: {
                            following: {
                                select: {
                                    username: true,
                                    email: true,
                                    name: true,
                                },
                            },
                            followedBy: {
                                select: {
                                    name: true,
                                    username: true,
                                    email: true,
                                },
                            },
                        },
                    })];
            case 1:
                user = _a.sent();
                console.log({ user: user, following: user === null || user === void 0 ? void 0 : user.following });
                if (user) {
                    return [2 /*return*/, res.status(200).json({
                            user: {
                                name: user.name,
                                username: user.username,
                                email: user.email,
                                joined: user.joined,
                                following: user.following,
                                followedBy: user.followedBy,
                            },
                        })];
                }
                return [2 /*return*/, res.status(404).json({ error: "User not found!" })];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_1 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.validateToken = validateToken;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, isValid, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, prisma.user.findUnique({
                        where: {
                            username: username,
                        },
                        include: {
                            following: {
                                select: {
                                    username: true,
                                    email: true,
                                    name: true,
                                },
                            },
                            followedBy: {
                                select: {
                                    name: true,
                                    username: true,
                                    email: true,
                                },
                            },
                        },
                    })];
            case 1:
                user = _b.sent();
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 2:
                isValid = _b.sent();
                if (isValid) {
                    token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env["SECRET"], {
                        expiresIn: "24h",
                    });
                    return [2 /*return*/, res.status(200).json({
                            user: {
                                name: user.name,
                                username: user.username,
                                email: user.email,
                                joined: user.joined,
                                following: user.following,
                                followedBy: user.followedBy,
                            },
                            token: token,
                        })];
                }
                return [2 /*return*/, res.status(401).json({ error: "Incorrect password" })];
            case 3: return [2 /*return*/, res.status(404).json({ error: "Incorrect username" })];
            case 4:
                error_2 = _b.sent();
                console.log({ error: error_2 });
                return [2 /*return*/, res.status(500).json({ error: "We're having trouble logging you." })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, password, username, salt, hashedPassword, newUser, token, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password, username = _a.username;
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 1:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
            case 2:
                hashedPassword = _b.sent();
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            username: username,
                            password: hashedPassword,
                            email: email,
                            name: name_1,
                        },
                    })];
            case 3:
                newUser = _b.sent();
                token = jsonwebtoken_1.default.sign({ userId: newUser.id }, process.env["SECRET"], {
                    expiresIn: "24h",
                });
                return [2 /*return*/, res.status(201).json({
                        user: {
                            name: newUser.name,
                            username: newUser.username,
                            email: newUser.email,
                            joined: newUser.joined,
                            following: [],
                            followedBy: [],
                        },
                        token: token,
                    })];
            case 4:
                error_3 = _b.sent();
                console.log({ error: error_3 });
                return [2 /*return*/, res.status(500).json({ error: error_3 })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.signUp = signUp;
