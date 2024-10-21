var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
export class UserService {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.user.findMany();
            const userList = users.map((user) => new User(user.id, user.mail, user.password, user.role));
            return userList;
        });
    }
    ;
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: {
                    id: userId,
                }
            });
            if (!user) {
                throw new Error(`Utilisateur avec l'ID ${userId} non trouvé.`);
            }
            return new User(user.id, user.mail, user.password, user.role);
        });
    }
    ;
    getUserByMailAndPassword(mail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: {
                    mail: mail,
                    password: password
                }
            });
            if (!user) {
                throw new Error(`Utilisateur avec non trouvé.`);
            }
            return new User(user.id, user.mail, user.password, user.role);
        });
    }
    ;
    addUser(mail, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield prisma.user.findUnique({
                where: {
                    mail: mail,
                }
            });
            if (existingUser) {
                throw new Error(`Un utilisateur avec l'adresse mail ${mail} existe déjà.`);
            }
            ;
            const hashedPassword = yield bcrypt.hash(password, 10);
            const user = yield prisma.user.create({
                data: {
                    mail: mail,
                    password: hashedPassword,
                    role: role
                }
            });
            return new User(user.id, user.mail, user.password, user.role);
        });
    }
    ;
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.delete({
                where: {
                    id: userId,
                }
            });
            return "User deleted";
        });
    }
    ;
    updateUser(userId, mail, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    mail: mail,
                    password: password,
                    role: role
                }
            });
            return new User(user.id, user.mail, user.password, user.role);
        });
    }
    ;
}
