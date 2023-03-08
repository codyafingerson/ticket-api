import { Router } from "express";
import TicketController from "../controllers/TicketController";
import verifyJWT, { isAdmin } from "../middleware/verifyJWT";

const router = Router();

// Tickets
router.route("/")
  .post(verifyJWT, isAdmin, TicketController.createTicket)
  .get(verifyJWT, isAdmin, TicketController.getTickets);

router.route("/:id")
  .get(verifyJWT, TicketController.getTicketById)
  .put(verifyJWT, isAdmin, TicketController.updateTicket)
  .delete(verifyJWT, isAdmin, TicketController.deleteTicket);

router.get("/status/open", TicketController.getTicketsByStatus);
router.get("/status/closed", TicketController.getTicketsByStatus);
router.get("/status/in-progress", TicketController.getTicketsByStatus);

// Notes
router.put("/:id/new-note", verifyJWT, TicketController.noteHandler);
router.delete("/:id/remove-note/:noteId", verifyJWT, isAdmin, TicketController.noteHandler);

// Part inventory
router.put("/:id/add-part", verifyJWT, isAdmin, TicketController.partInventoryHandler);
router.delete("/:id/remove-part/:partId", verifyJWT, isAdmin, TicketController.partInventoryHandler);

// Station records
router.put("/:id/add-station", verifyJWT, isAdmin, TicketController.stationRecordsHandler);
router.delete("/:id/remove-station/:stationId", verifyJWT, isAdmin, TicketController.stationRecordsHandler);

export default router;