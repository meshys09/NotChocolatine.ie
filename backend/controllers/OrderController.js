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
import { OrderService } from "../services/OrderService.js";
import { OrderProductService } from "../services/OrderProductService.js";
const orderController = new Hono();
const orderService = new OrderService();
const orderProductService = new OrderProductService();
orderController.get('/', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderList = yield orderService.getAllOrders();
        return yield c.json(orderList);
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
orderController.get('/:id', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = parseInt(c.req.param('id'), 10);
        const order = yield orderService.getOrderById(orderId);
        const products = yield orderProductService.getProductsByOrder(orderId);
        return c.json({ order, products });
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
orderController.get('/user/:id', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(c.req.param('id'), 10);
        const orderList = yield orderService.getOrdersByUserId(userId);
        return c.json(orderList);
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
orderController.post('/', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, price, userId } = yield c.req.json();
        const order = yield orderService.addOrder(date, price, userId);
        return c.json(order, 201);
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
orderController.delete('/:id', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = parseInt(c.req.param('id'), 10);
        const deleteOrder = yield orderService.deleteOrder(orderId);
        return c.json(deleteOrder);
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
orderController.post('/:orderId/product/:productId', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = parseInt(c.req.param('orderId'), 10);
        const productId = parseInt(c.req.param('productId'), 10);
        const { quantity } = yield c.req.json();
        const orderProduct = yield orderProductService.addProductToOrder(orderId, productId, quantity);
        return c.json(orderProduct, 201);
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
orderController.get('/:orderId/products', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = parseInt(c.req.param('orderId'), 10);
        const orderProducts = yield orderProductService.getProductsByOrder(orderId);
        return c.json(orderProducts);
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
export default orderController;
