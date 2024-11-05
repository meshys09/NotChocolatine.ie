import { PrismaClient } from "@prisma/client";
import { Product } from "../models/Product.js";

const prisma = new PrismaClient();

export class ProductService {

    async getAllProducts(): Promise<Product[]> {
        const products = await prisma.product.findMany();
        const productList = products.map(
            (product) => new Product(product.id, product.price, product.name, product.description)
        );
        return productList;
    };

    async getProductById(productId: number): Promise<Product> {
        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            }
        });
        if (!product) {
            throw new Error(`Product ${productId} not found.`);
        }

        return new Product(product.id, product.price, product.name, product.description)
    };

    async addProduct(price: number, name: string, description: string | null): Promise<Product> {
        const product = await prisma.product.create({
            data: {
                price: price,
                name: name,
                description: description,
            }
        })
        return new Product(product.id, product.price, product.name, product.description);
    };

    async deleteProduct(productId: number): Promise<string> {
        const product = await prisma.product.delete({
            where: {
                id: productId,
            }
        });
        return "Product deleted"
    };

    async updateProduct(productId: number, price?: number, name?: string, description?: string | null): Promise<Product> {
        const product = await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                price: price,
                name: name,
                description: description
            }
        });
        return new Product(product.id, product.price, product.name, product.description);
    };

}