import { PrismaClient } from "@prisma/client";
import { User } from "../models/User.js";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class UserService {

    async getAllUsers(page: number = 1, limit: number = 10): Promise<{ users: User[]; total: number }> {
        const offset = (page - 1) * limit;

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                skip: offset,
                take: limit,
            }),
            prisma.user.count(),
        ]);

        const userList = users.map((user) => new User(user.id, user.mail, user.password, user.role));
        return { users: userList, total };
    }

    async getUserById(userId: number): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        });
        if (!user) {
            throw new Error(`User ${userId} not found.`);
        }

        return new User(user.id, user.mail, user.password, user.role)
    };

    async getUserByMail(mail: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: { mail }
        });

        if (!user) {
            throw new Error(`User with email ${mail} not found.`);
        }

        return new User(user.id, user.mail, user.password, user.role);
    }

    async addUser(mail: string, password: string, role: number): Promise<User> {
        const existingUser = await prisma.user.findFirst({
            where: {
                mail: mail,
            }
        });
        if (existingUser) {
            throw new Error(`A user with the email address ${mail} already exists.`);
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                mail: mail,
                password: hashedPassword,
                role: role
            }
        })
        return new User(user.id, user.mail, user.password, user.role);
    };

    async deleteUser(userId: number): Promise<string> {
        const user = await prisma.user.delete({
            where: {
                id: userId,
            }
        });
        return "User deleted"
    };

    async updateUser(userId: number, mail?: string, password?: string, role?: number): Promise<User> {
        let hashedPassword: string | undefined;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                mail: mail,
                password: hashedPassword,
                role: role
            }
        });
        return new User(user.id, user.mail, user.password, user.role);
    };

}