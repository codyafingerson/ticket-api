import { Router } from "express";

import TicketController from "../controllers/TicketController";
import verifyJWT, { isAdmin } from "../middleware/verifyJWT";

const router = Router();

router.post("/", verifyJWT, isAdmin, TicketController.createTicket);
router.get("/", verifyJWT, isAdmin, TicketController.getTickets);
router.get("/:id", verifyJWT, TicketController.getTicketById);
router.put("/:id", verifyJWT, isAdmin, TicketController.updateTicket);
router.delete("/:id", verifyJWT, isAdmin, TicketController.deleteTicket);
router.get("/open", verifyJWT, TicketController.getOpenTickets);
router.get("/in-progress", verifyJWT, isAdmin, TicketController.getInProgressTickets);
router.get("/closed", verifyJWT, isAdmin, TicketController.getClosedTickets);

export default router;