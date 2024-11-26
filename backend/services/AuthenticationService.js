var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserService } from './UserService.js';
const userService = new UserService();
export class AuthenticationService {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || 'default_secret';
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userService.getUserByMail(email);
            if (!user) {
                throw new Error('User not found');
            }
            const isPasswordValid = yield bcrypt.compare(password, user.getPassword());
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }
            const token = this.generateToken(user.getId(), user.getMail());
            return {
                id: user.getId(),
                email: user.getMail(),
                role: user.getRole(),
                token
            };
        });
    }
    generateToken(userId, email) {
        const payload = { id: userId, email };
        return jwt.sign(payload, this.jwtSecret, { expiresIn: '1d' });
    }
    verifyToken(token) {
        try {
            return jwt.verify(token, this.jwtSecret);
        }
        catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}
