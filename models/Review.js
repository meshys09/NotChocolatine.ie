"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
var Review = /** @class */ (function () {
    function Review(id, comment, grade, user, product) {
        this.id = id;
        this.comment = comment;
        this.grade = grade;
        this.user = user;
        this.product = product;
    }
    // Getters
    Review.prototype.getId = function () {
        return this.id;
    };
    Review.prototype.getComment = function () {
        return this.comment;
    };
    Review.prototype.getGrade = function () {
        return this.grade;
    };
    Review.prototype.getUser = function () {
        return this.user;
    };
    Review.prototype.getProduct = function () {
        return this.product;
    };
    // Setters
    Review.prototype.setComment = function (comment) {
        this.comment = comment;
    };
    Review.prototype.setGrade = function (grade) {
        this.grade = grade;
    };
    Review.prototype.setUser = function (user) {
        this.user = user;
    };
    Review.prototype.setProduct = function (product) {
        this.product = product;
    };
    return Review;
}());
exports.Review = Review;
