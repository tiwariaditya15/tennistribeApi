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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleBookmarkPost = exports.deletePost = exports.newPost = exports.getPost = exports.getBookmarksFeed = exports.getFeed = exports.getExploreFeed = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var getExploreFeed = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.post.findMany({
                        select: {
                            id: true,
                            content: true,
                            reactions: true,
                            media: true,
                            timestamp: true,
                            author: {
                                select: {
                                    name: true,
                                    username: true,
                                    email: true,
                                },
                            },
                            comments: {
                                select: {
                                    id: true,
                                    comment: true,
                                    post: true,
                                    author: {
                                        select: {
                                            name: true,
                                            username: true,
                                            email: true,
                                        },
                                    },
                                },
                            },
                            likedBy: {
                                select: {
                                    id: true,
                                    username: true,
                                    name: true,
                                    email: true,
                                },
                            },
                            bookmarkedBy: {
                                select: {
                                    id: true,
                                    username: true,
                                    name: true,
                                    email: true,
                                },
                            },
                        },
                    })];
            case 1:
                posts = _a.sent();
                return [2 /*return*/, res.status(200).json({ posts: posts })];
            case 2:
                error_1 = _a.sent();
                console.log({ error: error_1 });
                return [2 /*return*/, res.status(500).json({ error: error_1 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getExploreFeed = getExploreFeed;
var getFeed = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, posts, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userId = req.userId;
                return [4 /*yield*/, prisma.user.findFirst({
                        where: {
                            id: userId,
                        },
                        select: {
                            following: {
                                select: {
                                    id: true,
                                },
                            },
                        },
                    })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, prisma.post.findMany({
                        orderBy: {
                            timestamp: "desc",
                        },
                        select: {
                            id: true,
                            content: true,
                            reactions: true,
                            media: true,
                            timestamp: true,
                            author: {
                                select: {
                                    name: true,
                                    username: true,
                                    email: true,
                                },
                            },
                            comments: {
                                select: {
                                    id: true,
                                    comment: true,
                                    post: true,
                                    author: {
                                        select: {
                                            name: true,
                                            username: true,
                                            email: true,
                                        },
                                    },
                                },
                            },
                            likedBy: {
                                select: {
                                    id: true,
                                    username: true,
                                    name: true,
                                    email: true,
                                },
                            },
                            bookmarkedBy: {
                                select: {
                                    id: true,
                                    username: true,
                                    name: true,
                                    email: true,
                                },
                            },
                        },
                        where: {
                            author: {
                                id: {
                                    in: user
                                        ? __spreadArray(__spreadArray([], user === null || user === void 0 ? void 0 : user["following"].map(function (user) { return user.id; }), true), [userId], false) : [],
                                },
                            },
                        },
                    })];
            case 2:
                posts = _a.sent();
                return [2 /*return*/, res.status(200).json({ posts: posts })];
            case 3:
                error_2 = _a.sent();
                console.log({ error: error_2 });
                return [2 /*return*/, res.status(500).json({ error: error_2 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getFeed = getFeed;
var getBookmarksFeed = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, posts, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.userId;
                return [4 /*yield*/, prisma.post.findMany({
                        where: {
                            bookmarkedBy: {
                                some: {
                                    id: userId,
                                },
                            },
                        },
                        select: {
                            id: true,
                            content: true,
                            reactions: true,
                            media: true,
                            timestamp: true,
                            author: {
                                select: {
                                    name: true,
                                    username: true,
                                    email: true,
                                },
                            },
                            comments: {
                                select: {
                                    id: true,
                                    comment: true,
                                    post: true,
                                    author: {
                                        select: {
                                            name: true,
                                            username: true,
                                            email: true,
                                        },
                                    },
                                },
                            },
                            likedBy: {
                                select: {
                                    id: true,
                                    username: true,
                                    name: true,
                                    email: true,
                                },
                            },
                            bookmarkedBy: {
                                select: {
                                    id: true,
                                    username: true,
                                    name: true,
                                    email: true,
                                },
                            },
                        },
                    })];
            case 1:
                posts = _a.sent();
                return [2 /*return*/, res.status(200).json({ posts: posts })];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_3 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBookmarksFeed = getBookmarksFeed;
var getPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, post, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                postId = req.params.postId;
                return [4 /*yield*/, prisma.post.findUnique({
                        where: {
                            id: postId,
                        },
                        select: {
                            id: true,
                            content: true,
                            reactions: true,
                            media: true,
                            timestamp: true,
                            author: {
                                select: {
                                    name: true,
                                    username: true,
                                    email: true,
                                },
                            },
                            comments: {
                                select: {
                                    id: true,
                                    comment: true,
                                    post: true,
                                    author: {
                                        select: {
                                            name: true,
                                            username: true,
                                            email: true,
                                        },
                                    },
                                },
                            },
                            likedBy: {
                                select: {
                                    id: true,
                                    name: true,
                                    username: true,
                                    email: true,
                                },
                            },
                            bookmarkedBy: {
                                select: {
                                    id: true,
                                    name: true,
                                    username: true,
                                    email: true,
                                },
                            },
                        },
                    })];
            case 1:
                post = _a.sent();
                if (post) {
                    return [2 /*return*/, res.status(200).json({ post: post })];
                }
                return [2 /*return*/, res.status(404).json({ message: "Post not found" })];
            case 2:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_4 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPost = getPost;
var newPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, content, media, createdPost, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userId = req.userId;
                _a = req.body, content = _a.content, media = _a.media;
                return [4 /*yield*/, prisma.post.create({
                        data: {
                            content: content,
                            media: media,
                            reactions: 1,
                            author: {
                                connect: { id: userId },
                            },
                        },
                    })];
            case 1:
                createdPost = _b.sent();
                return [2 /*return*/, res.status(200).json({ createdPost: createdPost })];
            case 2:
                error_5 = _b.sent();
                console.log({ error: error_5 });
                return [2 /*return*/, res.status(500).json({ error: error_5 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.newPost = newPost;
var deletePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, delComments, delPost, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                postId = req.body.postId;
                delComments = prisma.comment.deleteMany({
                    where: {
                        postId: postId,
                    },
                });
                delPost = prisma.post.delete({
                    where: {
                        id: postId,
                    },
                });
                return [4 /*yield*/, prisma.$transaction([delComments, delPost])];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Deleted post.", postId: postId })];
            case 2:
                error_6 = _a.sent();
                console.log({ error: error_6 });
                return [2 /*return*/, res.status(500).json({ error: error_6 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deletePost = deletePost;
var toggleBookmarkPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId_1, postId, post, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                userId_1 = req.userId;
                postId = req.body.postId;
                return [4 /*yield*/, prisma.post.findFirst({
                        where: {
                            id: postId,
                        },
                        select: {
                            bookmarkedBy: {
                                select: {
                                    id: true,
                                },
                            },
                        },
                    })];
            case 1:
                post = _a.sent();
                if (!post) {
                    return [2 /*return*/, res.status(404).json({ message: "Post not found" })];
                }
                if (!post.bookmarkedBy.some(function (user) { return user.id === userId_1; })) return [3 /*break*/, 3];
                return [4 /*yield*/, prisma.post.update({
                        where: {
                            id: postId,
                        },
                        data: {
                            bookmarkedBy: {
                                disconnect: {
                                    id: userId_1,
                                },
                            },
                        },
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Removed bookmark." })];
            case 3: return [4 /*yield*/, prisma.post.update({
                    where: {
                        id: postId,
                    },
                    data: {
                        bookmarkedBy: {
                            connect: {
                                id: userId_1,
                            },
                        },
                    },
                })];
            case 4:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Bookmarked." })];
            case 5:
                error_7 = _a.sent();
                console.log({ error: error_7 });
                return [2 /*return*/, res.status(500).json({ error: error_7 })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.toggleBookmarkPost = toggleBookmarkPost;
