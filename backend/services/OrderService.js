var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Order } from '../models/Order.js';
import { UserService } from './UserService.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const userService = new UserService();
export class OrderService {
    getAllOrders() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            const offset = (page - 1) * limit;
            const [orders, totalOrders] = yield Promise.all([
                prisma.order.findMany({
                    skip: offset,
                    take: limit,
                }),
                prisma.order.count(),
            ]);
            const orderList = yield Promise.all(orders.map((order) => __awaiter(this, void 0, void 0, function* () {
                const user = yield userService.getUserById(order.userId);
                if (!order.date || !order.price) {
                    throw new Error(`Order with ID ${order.id} has no date or price.`);
                }
                const userId = user.getId();
                if (userId === null) {
                    throw new Error(`User ID for order ${order.id} is null.`);
                }
                return new Order(order.id, order.date, order.price, userId);
            })));
            return {
                orders: orderList,
                totalOrders,
            };
        });
    }
    getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield prisma.order.findUnique({
                where: {
                    id: orderId,
                }
            });
            if (!order) {
                throw new Error(`Order ${orderId} not found.`);
            }
            const user = yield userService.getUserById(order.userId);
            if (!order.date || !order.price) {
                throw new Error(`Order with ID ${order.id} has no date or price.`);
            }
            const userId = user.getId();
            if (userId === null) {
                throw new Error(`User ID for order ${order.id} is null.`);
            }
            return new Order(order.id, order.date, order.price, userId);
        });
    }
    ;
    getOrdersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield prisma.order.findMany({
                where: {
                    userId: userId,
                }
            });
            const orderList = yield Promise.all(orders.map((order) => __awaiter(this, void 0, void 0, function* () {
                const user = yield userService.getUserById(order.userId);
                if (!order.date || !order.price) {
                    throw new Error(`Order with ID ${order.id} has no date.`);
                }
                return new Order(order.id, order.date, order.price, userId);
            })));
            return orderList;
        });
    }
    addOrder(date, price, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userService.getUserById(userId);
            const newOrder = yield prisma.order.create({
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
        });
    }
    deleteOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield prisma.order.delete({
                where: {
                    id: orderId,
                }
            });
            return "Order deleted";
        });
    }
}
