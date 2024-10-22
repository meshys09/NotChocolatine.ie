"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var Product = /** @class */ (function () {
    function Product(id, price, name, description) {
        this.id = id;
        this.price = price;
        this.name = name;
        this.description = description;
    }
    // Getters
    Product.prototype.getId = function () {
        return this.id;
    };
    Product.prototype.getPrice = function () {
        return this.price;
    };
    Product.prototype.getName = function () {
        return this.name;
    };
    Product.prototype.getDescription = function () {
        return this.description;
    };
    // Setters
    Product.prototype.setPrice = function (price) {
        this.price = price;
    };
    Product.prototype.setName = function (name) {
        this.name = name;
    };
    Product.prototype.setDescription = function (description) {
        this.description = description;
    };
    return Product;
}());
exports.Product = Product;
