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
import { AuthenticationService } from "../services/AuthenticationService.js";
const authController = new Hono();
const authenticationService = new AuthenticationService();
authController.post('/login', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mail, password } = yield c.req.json();
        if (!mail || !password) {
            return c.json({ message: "Email and password are required." }, 400);
        }
        const authenticatedUser = yield authenticationService.login(mail, password);
        return c.json(authenticatedUser, 200);
    }
    catch (error) {
        return c.json({ message: error.message }, 401);
    }
}));
export default authController;
