var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { OrderProduct } from "../models/OrderProduct";
import { OrderService } from "./OrderService";
import { PrismaClient } from '@prisma/client';
import { ProductService } from "./ProductService";
const prisma = new PrismaClient();
const orderService = new OrderService();
const productService = new ProductService();
export class OrderProductService {
    getProductByOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderProducts = yield prisma.orderProduct.findMany({
                where: {
                    orderId: orderId,
                }
            });
            const orderProductList = yield Promise.all(orderProducts.map((orderProduct) => __awaiter(this, void 0, void 0, function* () {
                const order = yield orderService.getOrderById(orderProduct.orderId);
                const product = yield productService.getProductById(orderProduct.productId);
                return new OrderProduct(order, product, orderProduct.quantity);
            })));
            return orderProductList;
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
            const orderProduct = yield prisma.orderProduct.create({
                data: {
                    orderId: orderId,
                    productId: productId,
                    quantity: quantity,
                }
            });
            return new OrderProduct(order, product, orderProduct.quantity);
        });
    }
    removeProductFromOrder(orderId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderProduct = yield prisma.orderProduct.deleteMany({
                where: {
                    orderId: orderId,
                    productId: productId,
                }
            });
            return "Product removed from order.";
        });
    }
    updateProductQuantity(orderId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.orderProduct.updateMany({
                where: {
                    orderId: orderId,
                    productId: productId,
                },
                data: {
                    quantity: quantity,
                }
            });
            const orderProduct = yield prisma.orderProduct.findUnique({
                where: {
                    orderId_productId: {
                        orderId: orderId,
                        productId: productId,
                    }
                }
            });
            if (!orderProduct) {
                throw new Error(`OrderProduct with orderId ${orderId} and productId ${productId} not found.`);
            }
            const order = yield orderService.getOrderById(orderId);
            const product = yield productService.getProductById(productId);
            return new OrderProduct(order, product, orderProduct.quantity);
        });
    }
}
