import { Hono } from "hono";
import { OrderService } from "../services/OrderService.js";

const orderController = new Hono();
const orderService = new OrderService();

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
        return c.json(order);
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
});

orderController.get('/user/:id', async (c) => {
    try {
        const userId = parseInt(c.req.param('id'), 10);
        const orderList = await orderService.getOrdersByUser(userId);
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



export default orderController;