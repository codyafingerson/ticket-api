import { Router } from "express";

import TicketController from "../controllers/TicketController";
import verifyJWT from "../middleware/verifyJWT";

const router = Router();

router.post("/", verifyJWT, TicketController.createTicket);
router.get("/", verifyJWT, TicketController.getTickets);
router.get("/:id", verifyJWT, TicketController.getTicketById);
router.put("/:id", verifyJWT, TicketController.updateTicket);
router.delete("/:id", verifyJWT, TicketController.deleteTicket);
router.get("/open", verifyJWT, TicketController.getOpenTickets);
router.get("/in-progress", verifyJWT, TicketController.getInProgressTickets);
router.get("/closed", verifyJWT, TicketController.getClosedTickets);

export default router;