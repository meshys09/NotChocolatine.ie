import { OrderProduct } from "../models/OrderProduct";
import { OrderService } from "./OrderService";
import { PrismaClient } from '@prisma/client';
import { ProductService } from "./ProductService";

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
            throw new Error(`Commande avec l'ID ${orderId} non trouvée.`);
        }

        const product = await productService.getProductById(productId);

        if (!product) {
            throw new Error(`Produit avec l'ID ${productId} non trouvé.`);
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

    async removeProductFromOrder(orderId: number, productId: number): Promise<string> {
        const orderProduct = await prisma.orderProduct.deleteMany({
            where: {
                orderId: orderId,
                productId: productId,
            }
        });
        return "Product removed from order.";
    }

    async updateProductQuantity(orderId: number, productId: number, quantity: number): Promise<OrderProduct> {
        await prisma.orderProduct.updateMany({
            where: {
                orderId: orderId,
                productId: productId,
            },
            data: {
                quantity: quantity,
            }
        });

        const orderProduct = await prisma.orderProduct.findUnique({
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

        const order = await orderService.getOrderById(orderId);
        const product = await productService.getProductById(productId);

        return new OrderProduct(order, product, orderProduct.quantity);
    }
}