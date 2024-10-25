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
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield prisma.product.findMany();
            const productList = products.map((product) => new Product(product.id, product.price, product.name, product.description));
            return productList;
        });
    }
    ;
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield prisma.product.findUnique({
                where: {
                    id: productId,
                }
            });
            if (!product) {
                throw new Error(`Produit avec l'ID ${productId} non trouvé.`);
            }
            return new Product(product.id, product.price, product.name, product.description);
        });
    }
    ;
    addProduct(productId, price, name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingProduct = yield prisma.product.findUnique({
                where: {
                    id: productId,
                }
            });
            if (existingProduct) {
                throw new Error(`Un produit avec l'Id ${productId} existe déjà.`);
            }
            ;
            const product = yield prisma.product.create({
                data: {
                    price: price,
                    name: name,
                    description: description,
                }
            });
            return new Product(product.id, product.price, product.name, product.description);
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
                    description: description,
                }
            });
            return new Product(product.id, product.price, product.name, product.description);
        });
    }
    ;
}
