import { OrderProduct } from "../models/OrderProduct.js";
import { PrismaClient } from '@prisma/client';
import { OrderService } from "./OrderService.js";
import { ProductService } from "./ProductService.js";

const prisma = new PrismaClient();
const orderService = new OrderService();
const productService = new ProductService();

export class OrderProductService {
    async getProductsByOrder(orderId: number): Promise<{ order: any; products: { price: any; name: any; quantity: any; }[] }> {
        const [order, orderProducts] = await Promise.all([
            orderService.getOrderById(orderId),
            prisma.orderProduct.findMany({ where: { orderId } }),
        ]);

        const products = await Promise.all(
            orderProducts.map(async (orderProduct) => {
                const product = await productService.getProductById(orderProduct.productId);
                return {
                    price: product.getPrice(),
                    name: product.getName(),
                    quantity: orderProduct.quantity,
                };
            })
        );
        return { order, products };
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

        if (product.getStock() < quantity) {
            throw new Error(`Insufficient stock for product ${productId}. Available: ${product.getStock()}, Requested: ${quantity}`);
        }

        await prisma.product.update({
            where: { id: productId },
            data: { stock: { decrement: quantity } },
        });

        const orderProduct = await prisma.orderProduct.create({
            data: {
                orderId: orderId,
                productId: productId,
                quantity: quantity,
            },
        });

        return new OrderProduct(order, product, orderProduct.quantity);
    }
}