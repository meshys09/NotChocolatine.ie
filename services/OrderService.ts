import { Order } from '../models/Order';
import { ProductService } from './ProductService';
import { UserService } from './UserService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const userService = new UserService();
const productService = new ProductService();

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
                    return new Order(order.id, order.date, order.price, user);
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
        return new Order(order.id, order.date, order.price, user);
    };

    async getOrdersByUser(userId: number): Promise<Order[]> {
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
                    return new Order(order.id, order.date, order.price, user);
                }
            )
        );
        return orderList;
    }
}