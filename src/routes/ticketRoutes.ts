/** Express router providing user related routes
 * @module /api/tickets
 * @requires express
 */

import { Router } from "express";
import TicketController from "../controllers/TicketController";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router = Router();

// Tickets
router.route("/")
  .post(AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, TicketController.createTicket)
  .get(AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, TicketController.getTickets);

router.route("/:id")
  .get(AuthMiddleware.verifyJWT, TicketController.getTicketById)
  .put(AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, TicketController.updateTicket)
  .delete(AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, TicketController.deleteTicket);

router.get("/status/:status", TicketController.getTicketsByStatus);

// Notes
router.put("/:id/new-note", AuthMiddleware.verifyJWT, TicketController.noteHandler);
router.delete("/:id/remove-note/:noteId", AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, TicketController.noteHandler);

// Part inventory
router.put("/:id/add-part", AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, TicketController.partInventoryHandler);
router.delete("/:id/remove-part/:partId", AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, TicketController.partInventoryHandler);

// Station records
router.put("/:id/add-station", AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, TicketController.stationRecordsHandler);
router.delete("/:id/remove-station/:stationId", AuthMiddleware.verifyJWT, AuthMiddleware.isAdmin, TicketController.stationRecordsHandler);

export default router;