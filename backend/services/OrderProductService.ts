import { OrderProduct } from "../models/OrderProduct.js";
import { PrismaClient } from '@prisma/client';
import { OrderService } from "./OrderService.js";
import { ProductService } from "./ProductService.js";

const prisma = new PrismaClient();
const orderService = new OrderService();
const productService = new ProductService();

export class OrderProductService {
    async getProductByOrder(orderId: number): Promise<OrderProduct[]> {
        const orderProducts = await prisma.orderProduct.findMany({
            where: {
                orderId: orderId,
            }
        });

        const orderProductList = await Promise.all(
            orderProducts.map(
                async (orderProduct) => {
                    const order = await orderService.getOrderById(orderProduct.orderId);
                    const product = await productService.getProductById(orderProduct.productId);

                    return new OrderProduct(order, product, orderProduct.quantity);
                }
            )
        );

        return orderProductList;
    }

    async addProductToOrder(orderId: number, productId: number, quantity: number): Promise<OrderProduct> {
        const order = await orderService.getOrderById(orderId);

        if (!order) {
            throw new Error(`Order ${orderId} not found.`);
        }

        const product = await productService.getProductById(productId);

        if (!product) {
            throw new Error(`Product ${productId} not found.`);
        }

        const orderProduct = await prisma.orderProduct.create({
            data: {
                orderId: orderId,
                productId: productId,
                quantity: quantity,
            }
        });

        return new OrderProduct(order, product, orderProduct.quantity);
    }

}