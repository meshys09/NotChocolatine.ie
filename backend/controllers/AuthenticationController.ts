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

// // Route de déconnexion
// authController.post('/logout', async (c) => {
//     // La déconnexion est généralement gérée côté client en supprimant le token JWT stocké
//     return c.json(authenticationService.logout(), 200);
// });

// // Middleware pour vérifier le token sur les routes protégées
// authController.use('/protected-route', async (c, next) => {
//     const authHeader = c.req.headers.get('Authorization');
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return c.json({ message: 'Authorization token missing or invalid' }, 401);
//     }

//     const token = authHeader.split(' ')[1];
//     try {
//         const decoded = authenticationService.verifyToken(token);
//         c.req.user = decoded; // Ajoute l'utilisateur au contexte pour les routes
//         await next();
//     } catch (error) {
//         return c.json({ message: 'Invalid or expired token' }, 401);
//     }
// });

export default authController;