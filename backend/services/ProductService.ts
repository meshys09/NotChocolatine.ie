import { PrismaClient } from "@prisma/client";
import { Product } from "../models/Product.js";

const prisma = new PrismaClient();

export class ProductService {

    async getAllProducts(page: number = 1, limit: number = 10): Promise<{ products: Product[]; totalProducts: number }> {
        const offset = (page - 1) * limit;

        const [products, totalProducts] = await Promise.all([
            prisma.product.findMany({
                skip: offset,
                take: limit,
            }),
            prisma.product.count(),
        ]);

        const productList = products.map(
            (product) => new Product(product.id, product.price, product.name, product.description, product.stock)
        );

        return { products: productList, totalProducts };
    }
    async getProductById(productId: number): Promise<Product> {
        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            }
        });
        if (!product) {
            throw new Error(`Product ${productId} not found.`);
        }

        return new Product(product.id, product.price, product.name, product.description, product.stock);
    };

    async addProduct(price: number, name: string, description: string | null, stock: number): Promise<Product> {
        const product = await prisma.product.create({
            data: {
                price: price,
                name: name,
                description: description,
                stock: stock
            }
        })
        return new Product(product.id, product.price, product.name, product.description, product.stock);
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
        return new Product(product.id, product.price, product.name, product.description, product.stock);
    };

}