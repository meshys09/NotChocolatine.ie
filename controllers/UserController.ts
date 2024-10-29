import { Hono } from "hono";
import { UserService } from "../services/UserService.js";

const userController = new Hono();
const userService = new UserService();

userController.get('/', async (c) => {
    try {
        const userList = await userService.getAllUsers();
        return await c.json(userList);

    } catch (error: any) {
        return c.json({ error: 'Failed to retrieve users', details: error.message }, 500);
    }
});

userController.get('/:id', async (c) => {
    try {
        const userId = parseInt(c.req.param('id'), 10);
        const user = await userService.getUserById(userId);
        return c.json(user);
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
});

userController.post('/', async (c) => {
    try {
        const { mail, password, role } = await c.req.json();
        const user = await userService.addUser(mail, password, role);

        return c.json(user, 201);
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
})

userController.post('/connect', async (c) => {
    try {
        const { mail, password } = await c.req.json();

        const user = await userService.getUserByMailAndPassword(mail, password);
        console.log(user);
        return c.json(user, 200);

    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
})

userController.delete('/:id', async (c) => {
    try {
        const userId = parseInt(c.req.param('id'), 10);
        const deleteUser = await userService.deleteUser(userId);
        return c.json(deleteUser);
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
});

userController.put('/:id', async (c) => {
    try {
        const userId = parseInt(c.req.param('id'), 10);

        const { mail, password, role } = await c.req.json();

        const updatedUser = await userService.updateUser(userId, mail, password, role);

        return c.json(updatedUser);
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
});

export default userController;