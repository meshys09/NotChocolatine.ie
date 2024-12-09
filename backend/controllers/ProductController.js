var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Hono } from "hono";
import { ProductService } from "../services/ProductService.js";
const productController = new Hono();
const productService = new ProductService();
productController.get('/', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(c.req.query('page') || '1', 10);
        const limit = parseInt(c.req.query('limit') || '10', 10);
        const { products, totalProducts } = yield productService.getAllProducts(page, limit);
        return c.json({
            products,
            meta: {
                currentPage: page,
                pageSize: limit,
                totalPages: Math.ceil(totalProducts / limit),
                totalProducts,
            },
        });
    }
    catch (error) {
        return c.json({ error: 'Failed to retrieve products', details: error.message }, 500);
    }
}));
productController.get('/:id', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = parseInt(c.req.param('id'), 10);
        const product = yield productService.getProductById(productId);
        return c.json(product);
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
productController.post('/', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { price, name, description, stock } = yield c.req.json();
        const product = yield productService.addProduct(price, name, description, stock);
        return c.json(product, 201);
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
productController.delete('/:id', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = parseInt(c.req.param('id'), 10);
        const deleteProduct = yield productService.deleteProduct(productId);
        return c.json(deleteProduct);
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
productController.put('/:id', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = parseInt(c.req.param('id'), 10);
        const { price, name, description } = yield c.req.json();
        const updatedProduct = yield productService.updateProduct(productId, price, name, description);
        return c.json(updatedProduct);
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
export default productController;
