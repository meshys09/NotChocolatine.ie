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
import { UserService } from "../services/UserService.js";
const userController = new Hono();
const userService = new UserService();
userController.get('/', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(c.req.query('page') || '1', 10);
        const limit = parseInt(c.req.query('limit') || '10', 10);
        const { users, total } = yield userService.getAllUsers(page, limit);
        const totalPages = Math.ceil(total / limit);
        return c.json({
            users,
            meta: {
                currentPage: page,
                pageSize: limit,
                totalPages,
                totalUsers: total,
            },
        });
    }
    catch (error) {
        return c.json({ error: 'Failed to retrieve users', details: error.message }, 500);
    }
}));
userController.get('/:id', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(c.req.param('id'), 10);
        const user = yield userService.getUserById(userId);
        return c.json(user);
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
userController.post('/', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mail, password, role } = yield c.req.json();
        const user = yield userService.addUser(mail, password, role);
        return c.json(user, 201);
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
userController.delete('/:id', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(c.req.param('id'), 10);
        const deleteUser = yield userService.deleteUser(userId);
        return c.json(deleteUser);
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
userController.put('/:id', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(c.req.param('id'), 10);
        const { mail, password, role } = yield c.req.json();
        const updatedUser = yield userService.updateUser(userId, mail, password, role);
        return c.json(updatedUser);
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
export default userController;
