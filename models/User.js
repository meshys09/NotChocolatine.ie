"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(id, mail, password, role) {
        this.id = id;
        this.mail = mail;
        this.password = password;
        this.role = role;
    }
    // Getters
    User.prototype.getId = function () {
        return this.id;
    };
    User.prototype.getMail = function () {
        return this.mail;
    };
    User.prototype.getPassword = function () {
        return this.password;
    };
    User.prototype.getRole = function () {
        return this.role;
    };
    // Setters
    User.prototype.setMail = function (mail) {
        this.mail = mail;
    };
    User.prototype.setPassword = function (password) {
        this.password = password;
    };
    User.prototype.setRole = function (role) {
        this.role = role;
    };
    return User;
}());
exports.User = User;
