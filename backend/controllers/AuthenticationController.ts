import { Hono } from "hono";
import { AuthenticationService } from "../services/AuthenticationService.js";

const authController = new Hono();
const authenticationService = new AuthenticationService();


authController.post('/login', async (c) => {
    try {
        const { mail, password } = await c.req.json();

        if (!mail || !password) {
            return c.json({ message: "Email and password are required." }, 400);
        }

        const authenticatedUser = await authenticationService.login(mail, password);

        return c.json(authenticatedUser, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 401);
    }
});


export default authController;