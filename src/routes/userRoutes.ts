import { Router } from "express";
import UserController from "../controllers/UserController";
import verifyJWT, { isAdmin } from "../middleware/verifyJWT";

const router = Router();

router.post("/login", UserController.loginUser);
router.post("/register", UserController.registerUser);
router.get("/:id", verifyJWT, UserController.getUser);
router.put("/:id", verifyJWT, UserController.updateUser);
router.delete("/:id", verifyJWT, UserController.deleteUser);

export default router;