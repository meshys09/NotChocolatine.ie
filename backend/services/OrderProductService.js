var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { OrderProduct } from "../models/OrderProduct.js";
import { PrismaClient } from '@prisma/client';
import { OrderService } from "./OrderService.js";
import { ProductService } from "./ProductService.js";
const prisma = new PrismaClient();
const orderService = new OrderService();
const productService = new ProductService();
export class OrderProductService {
    getProductsByOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [order, orderProducts] = yield Promise.all([
                orderService.getOrderById(orderId),
                prisma.orderProduct.findMany({ where: { orderId } }),
            ]);
            const products = yield Promise.all(orderProducts.map((orderProduct) => __awaiter(this, void 0, void 0, function* () {
                const product = yield productService.getProductById(orderProduct.productId);
                return {
                    price: product.getPrice(),
                    name: product.getName(),
                    quantity: orderProduct.quantity,
                };
            })));
            return { order, products };
        });
    }
    addProductToOrder(orderId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield orderService.getOrderById(orderId);
            if (!order) {
                throw new Error(`Order ${orderId} not found.`);
            }
            const product = yield productService.getProductById(productId);
            if (!product) {
                throw new Error(`Product ${productId} not found.`);
            }
            if (product.getStock() < quantity) {
                throw new Error(`Insufficient stock for product ${productId}. Available: ${product.getStock()}, Requested: ${quantity}`);
            }
            yield prisma.product.update({
                where: { id: productId },
                data: { stock: { decrement: quantity } },
            });
            const orderProduct = yield prisma.orderProduct.create({
                data: {
                    orderId: orderId,
                    productId: productId,
                    quantity: quantity,
                },
            });
            return new OrderProduct(order, product, orderProduct.quantity);
        });
    }
}
