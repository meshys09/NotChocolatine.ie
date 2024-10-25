import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import userController from './controllers/UserController.js';

const app = new Hono();

app.get('/', (c) => {
    return c.text('Hello!');
});

app.route('/users', userController);
app.route('/reviews', reviewController);
app.route('/products', productController);
app.route('/orders', orderController);

export default app;

serve(app, (info) => {
    console.log(`Listening on http://localhost:${info.port}`);
});