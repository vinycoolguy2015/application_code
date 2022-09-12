"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const utilities_1 = require("./utilities");
const config = require('config');
const serviceConfig = config.get('service.service');
const baseUrl = "/api";
const corsOptions = {
    origin: 'http://localhost:3000',
};
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('combined'));
app.use((0, cors_1.default)(corsOptions));
app.get(`${baseUrl}/status`, async (req, res) => {
    return res.status(200).send('Alive');
});
app.post(`${baseUrl}/images`, async (req, res) => {
    let upload = (0, multer_1.default)({ storage: utilities_1.storage, limits: { fileSize: 1000000 }, fileFilter: utilities_1.imageFilter }).array('images', 10);
    upload(req, res, async (err) => {
        let result = [];
        if (req.fileValidationError) {
            return res.status(400).send(req.fileValidationError);
        }
        else if (err instanceof multer_1.default.MulterError) {
            return res.status(500).send(err);
        }
        else if (err) {
            return res.status(500).send(err);
        }
        for (const file of req.files) {
            result.push({ id: path_1.default.parse(file.filename).name, filename: file.originalname });
        }
        res.status(200).send(result);
    });
});
app.get(`${baseUrl}/images`, async (req, res) => {
    const id = req.query.id;
    try {
        const content = fs_1.default.readFileSync(`./static/${id}.png`);
    }
    catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
    res.status(200).sendFile(path_1.default.resolve(`./static/${id}.png`));
});
app.listen(serviceConfig.port, () => {
    console.log(`Image API listening on port ${serviceConfig.port}`);
});
//# sourceMappingURL=index.js.map