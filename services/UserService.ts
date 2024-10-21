import { PrismaClient } from "@prisma/client";
import { User } from "../models/User.js";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class UserService {

    async getAllUsers(): Promise<User[]> {
        const users = await prisma.user.findMany();
        const userList = users.map(
            (user) => new User(user.id, user.mail, user.password, user.role)
        );
        return userList;
    };

    async getUserById(userId: number): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        });
        if (!user) {
            throw new Error(`Utilisateur avec l'ID ${userId} non trouvé.`);
        }

        return new User(user.id, user.mail, user.password, user.role)
    };

    async getUserByMailAndPassword(mail: string, password: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                mail: mail,
                password: password
            }
        });
        if (!user) {
            throw new Error(`Utilisateur avec non trouvé.`);
        }

        return new User(user.id, user.mail, user.password, user.role)
    };

    async addUser(mail: string, password: string, role: number): Promise<User> {
        const existingUser = await prisma.user.findUnique({
            where: {
                mail: mail,
            }
        });
        if (existingUser) {
            throw new Error(`Un utilisateur avec l'adresse mail ${mail} existe déjà.`);
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
        const user = await prisma.user.update({
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
    };

}