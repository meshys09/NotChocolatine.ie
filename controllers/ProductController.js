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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var hono_1 = require("hono");
var ProductService_js_1 = require("../services/ProductService.js");
var productController = new hono_1.Hono();
var productService = new ProductService_js_1.ProductService();
productController.get('/', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var productList, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, productService.getAllProducts()];
            case 1:
                productList = _a.sent();
                return [4 /*yield*/, c.json(productList)];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, c.json({ error: 'Failed to retrieve products', details: error_1.message }, 500)];
            case 4: return [2 /*return*/];
        }
    });
}); });
productController.get('/:id', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, product, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                productId = parseInt(c.req.param('id'), 10);
                return [4 /*yield*/, productService.getProductById(productId)];
            case 1:
                product = _a.sent();
                return [2 /*return*/, c.json(product)];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, c.json({ message: error_2.message }, 404)];
            case 3: return [2 /*return*/];
        }
    });
}); });
productController.post('/newProduct', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, productId, price, name_1, description, product, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, c.req.json()];
            case 1:
                _a = _b.sent(), productId = _a.productId, price = _a.price, name_1 = _a.name, description = _a.description;
                return [4 /*yield*/, productService.addProduct(productId, price, name_1, description)];
            case 2:
                product = _b.sent();
                return [2 /*return*/, c.json(product, 201)];
            case 3:
                error_3 = _b.sent();
                return [2 /*return*/, c.json({ message: error_3.message }, 404)];
            case 4: return [2 /*return*/];
        }
    });
}); });
productController.delete('/:id', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, deleteProduct, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                productId = parseInt(c.req.param('id'), 10);
                return [4 /*yield*/, productService.deleteProduct(productId)];
            case 1:
                deleteProduct = _a.sent();
                return [2 /*return*/, c.json(deleteProduct)];
            case 2:
                error_4 = _a.sent();
                return [2 /*return*/, c.json({ message: error_4.message }, 404)];
            case 3: return [2 /*return*/];
        }
    });
}); });
productController.put('/:id', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, _a, price, name_2, description, updatedProduct, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                productId = parseInt(c.req.param('id'), 10);
                return [4 /*yield*/, c.req.json()];
            case 1:
                _a = _b.sent(), price = _a.price, name_2 = _a.name, description = _a.description;
                return [4 /*yield*/, productService.updateProduct(productId, price, name_2, description)];
            case 2:
                updatedProduct = _b.sent();
                return [2 /*return*/, c.json(updatedProduct)];
            case 3:
                error_5 = _b.sent();
                return [2 /*return*/, c.json({ message: error_5.message }, 404)];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = productController;
