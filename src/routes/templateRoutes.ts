import { Router } from "express";

import TemplateController from "../controllers/TemplateController";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router = Router();

router.post("/", AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, TemplateController.createTemplate);
router.get("/", AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, TemplateController.getTemplates);
router.get("/:id", AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, TemplateController.getTemplateById);
router.put("/:id", AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, TemplateController.updateTemplate);
router.delete("/:id", AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, TemplateController.deleteTemplate);

export default router;