/** Express router providing user related routes
 * @module /api/users
 * @requires express
 */
import { Router } from "express";
import UserController from "../controllers/UserController";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router = Router();

router.get("/all", AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, UserController.getAllUsers);
router.post("/login", UserController.loginUser);
router.post("/register", AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, UserController.registerUser);
router.get("/:id", AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, UserController.getUser);
router.put("/:id", AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, UserController.updateUser);
router.delete("/:id", AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, UserController.deleteUser);

export default router;