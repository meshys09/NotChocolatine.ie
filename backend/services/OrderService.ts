import { Order } from '../models/Order.js';
import { UserService } from './UserService.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const userService = new UserService();

export class OrderService {
    async getAllOrders(): Promise<Order[]> {
        const orders = await prisma.order.findMany();
        const orderList = await Promise.all(
            orders.map(
                async (order) => {
                    const user = await userService.getUserById(order.userId);

                    if (!order.date || !order.price) {
                        throw new Error(`Order with ID ${order.id} has no date or price.`);
                    }
                    const userId = user.getId();
                    if (userId === null) {
                        throw new Error(`User ID for order ${order.id} is null.`);
                    }
                    return new Order(order.id, order.date, order.price, userId);
                }
            )
        );
        return orderList;
    };

    async getOrderById(orderId: number): Promise<Order> {
        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
            }
        });
        if (!order) {
            throw new Error(`Order ${orderId} not found.`);
        }

        const user = await userService.getUserById(order.userId);

        if (!order.date || !order.price) {
            throw new Error(`Order with ID ${order.id} has no date or price.`);
        }
        const userId = user.getId();
        if (userId === null) {
            throw new Error(`User ID for order ${order.id} is null.`);
        }

        return new Order(order.id, order.date, order.price, userId);
    };

    async getOrdersByUserId(userId: number): Promise<Order[]> {
        const orders = await prisma.order.findMany({
            where: {
                userId: userId,
            }
        });
        const orderList = await Promise.all(
            orders.map(
                async (order) => {
                    const user = await userService.getUserById(order.userId);
                    if (!order.date || !order.price) {
                        throw new Error(`Order with ID ${order.id} has no date.`);
                    }
                    return new Order(order.id, order.date, order.price, userId);
                }
            )
        );
        return orderList;
    }

    async addOrder(date: Date, price: number, userId: number): Promise<Order> {
        const user = await userService.getUserById(userId);
        const newOrder = await prisma.order.create({
            data: {
                date: date,
                price: price,
                userId: userId,
            }
        });
        if (!newOrder.date || !newOrder.price) {
            throw new Error(`New order with ID ${newOrder.id} has no date or price.`);
        }
        return new Order(newOrder.id, newOrder.date, newOrder.price, userId);
    }

    async deleteOrder(orderId: number): Promise<string> {
        const order = await prisma.order.delete({
            where: {
                id: orderId,
            }
        });
        return "Order deleted"
    }
}