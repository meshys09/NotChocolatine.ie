import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import userController from './controllers/UserController.js';
import reviewController from './controllers/ReviewController.js';
import productController from './controllers/ProductController.js';
import orderController from './controllers/OrderController.js';
import authController from './controllers/AuthenticationController.js';
import { cors } from 'hono/cors';

const app = new Hono();

app.use(
    '*',
    cors({
        origin: 'http://localhost:3001', // Autorise l'origine de ton front-end
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
        allowHeaders: ['Content-Type', 'Authorization'] // En-têtes autorisés
    })
);

app.get('/', (c) => {
    return c.text('Hello!');
});

app.route('/users', userController);
app.route('/reviews', reviewController);
app.route('/products', productController);
app.route('/orders', orderController);
app.route('/auth', authController);

export default app;

serve(app, (info) => {
    console.log(`Listening on http://localhost:${info.port}`);
});