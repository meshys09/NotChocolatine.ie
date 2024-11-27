import { Hono } from "hono";
import { ProductService } from "../services/ProductService.js";

const productController = new Hono();
const productService = new ProductService();

productController.get('/', async (c) => {
    try {
        const productList = await productService.getAllProducts();
        return await c.json(productList);

    } catch (error: any) {
        return c.json({ error: 'Failed to retrieve products', details: error.message }, 500);
    }
});

productController.get('/:id', async (c) => {
    try {
        const productId = parseInt(c.req.param('id'), 10);
        const product = await productService.getProductById(productId);
        return c.json(product);
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
});

productController.post('/', async (c) => {
    try {
        const { price, name, description } = await c.req.json();
        const product = await productService.addProduct(price, name, description);

        return c.json(product, 201);
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
})

productController.delete('/:id', async (c) => {
    try {
        const productId = parseInt(c.req.param('id'), 10);
        const deleteProduct = await productService.deleteProduct(productId);
        return c.json(deleteProduct);
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
});

productController.put('/:id', async (c) => {
    try {
        const productId = parseInt(c.req.param('id'), 10);

        const { price, name, description } = await c.req.json();

        const updatedProduct = await productService.updateProduct(productId, price, name, description);

        return c.json(updatedProduct);
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
});

export default productController;