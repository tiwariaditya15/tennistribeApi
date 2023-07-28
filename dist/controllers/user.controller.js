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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollowings = exports.getUsers = exports.unfollowUser = exports.followUser = exports.getProfileByUsername = exports.getCurrentUserProfile = exports.updateProfile = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var updateProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
exports.updateProfile = updateProfile;
var getCurrentUserProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
                        select: {
                            name: true,
                            username: true,
                            email: true,
                            following: {
                                select: {
                                    name: true,
                                    username: true,
                                    email: true,
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
                if (user) {
                    return [2 /*return*/, res.status(200).json({ user: user })];
                }
                return [2 /*return*/, res.status(404).json({ message: "User doesn't exist." })];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_1 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCurrentUserProfile = getCurrentUserProfile;
var getProfileByUsername = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                username = req.params.username;
                return [4 /*yield*/, prisma.user.findUnique({
                        where: {
                            username: username,
                        },
                        include: {
                            following: {
                                select: {
                                    name: true,
                                    username: true,
                                    email: true,
                                },
                            },
                            followedBy: {
                                select: {
                                    name: true,
                                    username: true,
                                    email: true,
                                },
                            },
                            posts: {
                                select: {
                                    id: true,
                                    content: true,
                                    reactions: true,
                                    media: true,
                                    timestamp: true,
                                    author: {
                                        select: {
                                            username: true,
                                            email: true,
                                            name: true,
                                        },
                                    },
                                    likedBy: {
                                        select: {
                                            username: true,
                                            email: true,
                                            name: true,
                                        },
                                    },
                                    bookmarkedBy: {
                                        select: {
                                            username: true,
                                            email: true,
                                            name: true,
                                        },
                                    },
                                    comments: {
                                        select: {
                                            id: true,
                                            comment: true,
                                            postId: true,
                                            authorId: true,
                                        },
                                    },
                                },
                            },
                        },
                    })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        user: {
                            email: user === null || user === void 0 ? void 0 : user.email,
                            username: user === null || user === void 0 ? void 0 : user.username,
                            name: user === null || user === void 0 ? void 0 : user.name,
                            joined: user === null || user === void 0 ? void 0 : user.joined,
                            following: user === null || user === void 0 ? void 0 : user.following,
                            followedBy: user === null || user === void 0 ? void 0 : user.followedBy,
                        },
                        posts: user === null || user === void 0 ? void 0 : user.posts,
                    })];
            case 2:
                error_2 = _a.sent();
                console.log({ error: error_2 });
                return [2 /*return*/, res.status(200).json({ error: error_2 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProfileByUsername = getProfileByUsername;
var followUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, username, addToFollwedBy, addToFollowingOfCurrentUser, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.userId;
                username = req.body.username;
                addToFollwedBy = prisma.user.update({
                    where: {
                        username: username,
                    },
                    data: {
                        followedBy: {
                            connect: {
                                id: userId,
                            },
                        },
                    },
                });
                addToFollowingOfCurrentUser = prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        following: {
                            connect: {
                                username: username,
                            },
                        },
                    },
                });
                return [4 /*yield*/, prisma.$transaction([addToFollwedBy, addToFollowingOfCurrentUser])];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ followed: true })];
            case 2:
                error_3 = _a.sent();
                console.log({ error: error_3 });
                return [2 /*return*/, res.status(200).json({ error: error_3 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.followUser = followUser;
var unfollowUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, username, removeFromFollwedBy, removeFromFollowingOfCurrentUser, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.userId;
                username = req.body.username;
                removeFromFollwedBy = prisma.user.update({
                    where: {
                        username: username,
                    },
                    data: {
                        followedBy: {
                            disconnect: {
                                id: userId,
                            },
                        },
                    },
                });
                removeFromFollowingOfCurrentUser = prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        following: {
                            disconnect: {
                                username: username,
                            },
                        },
                    },
                });
                return [4 /*yield*/, prisma.$transaction([
                        removeFromFollwedBy,
                        removeFromFollowingOfCurrentUser,
                    ])];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ unfollowed: true })];
            case 2:
                error_4 = _a.sent();
                console.log({ error: error_4 });
                return [2 /*return*/, res.status(200).json({ error: error_4 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.unfollowUser = unfollowUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId_1, users, filtered, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId_1 = req.userId;
                return [4 /*yield*/, prisma.user.findMany({})];
            case 1:
                users = _a.sent();
                console.log({ users: users });
                if (users.length) {
                    filtered = users
                        .filter(function (user) { return user.id !== userId_1; })
                        .map(function (user) { return ({
                        email: user.email,
                        username: user.username,
                        name: user.name,
                    }); });
                    return [2 /*return*/, res.status(200).json({ users: filtered })];
                }
                return [2 /*return*/, res.status(404).json({ message: "No one is signed in." })];
            case 2:
                error_5 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_5 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
var getFollowings = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, data, error_6;
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
                            following: true,
                        },
                    })];
            case 1:
                data = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        following: data === null || data === void 0 ? void 0 : data.following.map(function (_a) {
                            var email = _a.email, username = _a.username, name = _a.name, joined = _a.joined;
                            return ({
                                email: email,
                                username: username,
                                name: name,
                                joined: joined,
                            });
                        }),
                    })];
            case 2:
                error_6 = _a.sent();
                console.log({ error: error_6 });
                return [2 /*return*/, res.status(200).json({ error: error_6 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getFollowings = getFollowings;
