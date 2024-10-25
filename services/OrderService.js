var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Order } from '../models/Order';
import { ProductService } from './ProductService';
import { UserService } from './UserService';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const userService = new UserService();
const productService = new ProductService();
export class OrderService {
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield prisma.order.findMany();
            const orderList = yield Promise.all(orders.map((order) => __awaiter(this, void 0, void 0, function* () {
                const user = yield userService.getUserById(order.userId);
                if (!order.date || !order.price) {
                    throw new Error(`Order with ID ${order.id} has no date or price.`);
                }
                return new Order(order.id, order.date, order.price, user);
            })));
            return orderList;
        });
    }
    ;
    getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield prisma.order.findUnique({
                where: {
                    id: orderId,
                }
            });
            if (!order) {
                throw new Error(`Commande avec l'ID ${orderId} non trouvée.`);
            }
            const user = yield userService.getUserById(order.userId);
            if (!order.date || !order.price) {
                throw new Error(`Order with ID ${order.id} has no date or price.`);
            }
            return new Order(order.id, order.date, order.price, user);
        });
    }
    ;
    getOrdersByUser(userId) {
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
                return new Order(order.id, order.date, order.price, user);
            })));
            return orderList;
        });
    }
}
