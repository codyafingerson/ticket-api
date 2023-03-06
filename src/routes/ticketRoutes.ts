import { Router } from "express";

import TicketController from "../controllers/TicketController";
import verifyJWT, { isAdmin } from "../middleware/verifyJWT";

const router = Router();

router.post("/", verifyJWT, isAdmin, TicketController.createTicket);
router.get("/", verifyJWT, isAdmin, TicketController.getTickets);
router.get("/:id", verifyJWT, TicketController.getTicketById);
router.put("/:id", verifyJWT, isAdmin, TicketController.updateTicket);
router.delete("/:id", verifyJWT, isAdmin, TicketController.deleteTicket);
router.get('/status/open', TicketController.getTicketsByStatus);
router.get('/status/closed', TicketController.getTicketsByStatus);
router.get('/status/in-progress', TicketController.getTicketsByStatus);


export default router;