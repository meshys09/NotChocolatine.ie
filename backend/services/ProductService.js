var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
import { Product } from "../models/Product.js";
const prisma = new PrismaClient();
export class ProductService {
    getAllProducts() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            const offset = (page - 1) * limit;
            const [products, totalProducts] = yield Promise.all([
                prisma.product.findMany({
                    skip: offset,
                    take: limit,
                }),
                prisma.product.count(),
            ]);
            const productList = products.map((product) => new Product(product.id, product.price, product.name, product.description, product.stock));
            return { products: productList, totalProducts };
        });
    }
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield prisma.product.findUnique({
                where: {
                    id: productId,
                }
            });
            if (!product) {
                throw new Error(`Product ${productId} not found.`);
            }
            return new Product(product.id, product.price, product.name, product.description, product.stock);
        });
    }
    ;
    addProduct(price, name, description, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield prisma.product.create({
                data: {
                    price: price,
                    name: name,
                    description: description,
                    stock: stock
                }
            });
            return new Product(product.id, product.price, product.name, product.description, product.stock);
        });
    }
    ;
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield prisma.product.delete({
                where: {
                    id: productId,
                }
            });
            return "Product deleted";
        });
    }
    ;
    updateProduct(productId, price, name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield prisma.product.update({
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
        });
    }
    ;
}
