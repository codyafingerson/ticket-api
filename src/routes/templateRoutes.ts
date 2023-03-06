import { Router } from "express";

import TemplateController from "../controllers/TemplateController";
import verifyJWT, { isAdmin } from "../middleware/verifyJWT";

const router = Router();

router.post("/", verifyJWT, isAdmin, TemplateController.createTemplate);
router.get("/", verifyJWT, isAdmin, TemplateController.getTemplates);
router.get("/:id", verifyJWT, isAdmin, TemplateController.getTemplateById);
router.put("/:id", verifyJWT, isAdmin, TemplateController.updateTemplate);
router.delete("/:id", verifyJWT, isAdmin, TemplateController.deleteTemplate);

export default router;