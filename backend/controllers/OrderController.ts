import { Hono } from "hono";
import { OrderService } from "../services/OrderService.js";
import { OrderProductService } from "../services/OrderProductService.js";

const orderController = new Hono();
const orderService = new OrderService();
const orderProductService = new OrderProductService();

orderController.get('/', async (c) => {
    try {
        const orderList = await orderService.getAllOrders();
        return await c.json(orderList);

    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
});

orderController.get('/:id', async (c) => {
    try {
        const orderId = parseInt(c.req.param('id'), 10);
        const order = await orderService.getOrderById(orderId);
        const products = await orderProductService.getProductsByOrder(orderId);

        return c.json({ order, products });
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
});

orderController.get('/user/:id', async (c) => {
    try {
        const userId = parseInt(c.req.param('id'), 10);
        const orderList = await orderService.getOrdersByUserId(userId);
        return c.json(orderList);
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
});

orderController.post('/', async (c) => {
    try {
        const { date, price, userId } = await c.req.json();
        const order = await orderService.addOrder(date, price, userId);

        return c.json(order, 201);
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
});

orderController.delete('/:id', async (c) => {
    try {
        const orderId = parseInt(c.req.param('id'), 10);
        const deleteOrder = await orderService.deleteOrder(orderId);
        return c.json(deleteOrder);
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
});

orderController.post('/:orderId/product/:productId', async (c) => {
    try {
        const orderId = parseInt(c.req.param('orderId'), 10);
        const productId = parseInt(c.req.param('productId'), 10);
        const { quantity } = await c.req.json();

        const orderProduct = await orderProductService.addProductToOrder(orderId, productId, quantity);
        return c.json(orderProduct, 201);
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
});

orderController.get('/:orderId/products', async (c) => {
    try {
        const orderId = parseInt(c.req.param('orderId'), 10);
        const orderProducts = await orderProductService.getProductsByOrder(orderId);
        return c.json(orderProducts);
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
});

export default orderController;