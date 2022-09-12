"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFilter = exports.storage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
exports.storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/');
    },
    filename: function (req, file, cb) {
        cb(null, (0, uuid_1.v4)() + path_1.default.extname(file.originalname).toLowerCase());
    }
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(png|PNG)$/)) {
        req.fileValidationError = 'Only png images are allowed!';
        return cb(new Error('Only png images are allowed!'), false);
    }
    return cb(null, true);
};
exports.imageFilter = imageFilter;
//# sourceMappingURL=image-upload.js.map