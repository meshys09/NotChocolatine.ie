import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserService } from './UserService.js';

interface AuthenticatedUser {
    id: number;
    email: string;
    role: number;
    token: string;
}

const userService = new UserService();

export class AuthenticationService {
    private jwtSecret: string;

    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || 'default_secret';
    }

    async login(email: string, password: string): Promise<AuthenticatedUser | null> {

        const user = await userService.getUserByMail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.getPassword());

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
    }


    private generateToken(userId: number, email: string): string {
        const payload = { id: userId, email };
        return jwt.sign(payload, this.jwtSecret, { expiresIn: '1d' });
    }


    verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.jwtSecret);
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}

