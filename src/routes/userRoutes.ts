/** Express router providing user related routes
 * @module routers/users
 * @requires express
 */
import { Router } from "express";
import UserController from "../controllers/UserController";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router = Router();

router.post("/login", UserController.loginUser);
router.post("/register", UserController.registerUser); // This will be protected by the AuthMiddleware in the future
router.get("/:id", AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, UserController.getUser);
router.put("/:id", AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, UserController.updateUser);
router.delete("/:id", AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, UserController.deleteUser);

export default router;