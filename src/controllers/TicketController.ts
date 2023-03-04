import asyncHandler from "express-async-handler";
import Ticket, { TicketDocument } from "../models/Ticket";
import { Request, Response } from "express";

/**
 * Ticket controller class for handling ticket related requests and responses
 * @class TicketController
 * @exports TicketController
 */
class TicketController {
    static createTicket = asyncHandler(async (req: Request, res: Response) => {
        const {
            status,
            ticketNumber,
            productName,
            revision,
            quantity,
            lotNumber,
            partInventory,
            stationRecords,
        } = req.body;

        const ticket = await Ticket.create({
            status,
            ticketNumber,
            productName,
            revision,
            quantity,
            lotNumber,
            partInventory,
            stationRecords,
        });

        if (ticket) {
            res.status(201).json({
                _id: ticket._id,
                status: ticket.status,
                ticketNumber: ticket.ticketNumber,
                productName: ticket.productName,
                revision: ticket.revision,
                quantity: ticket.quantity,
                lotNumber: ticket.lotNumber,
                partInventory: ticket.partInventory,
                stationRecords: ticket.stationRecords,
            });
        } else {
            res.status(400);
            throw new Error("Invalid ticket data");
        }
    });

    static getTickets = asyncHandler(async (req: Request, res: Response) => {
        const tickets = await Ticket.find({});
        res.json(tickets);
    });

    static getTicketById = asyncHandler(async (req: Request, res: Response) => {
        const ticket = await Ticket.findById(req.params.id);
        if (ticket) {
            res.json(ticket);
        } else {
            res.status(404);
            throw new Error("Ticket not found");
        }
    });

    static updateTicket = asyncHandler(async (req: Request, res: Response) => {
        const {
            status,
            ticketNumber,
            productName,
            revision,
            quantity,
            lotNumber,
            partInventory,
            stationRecords,
        } = req.body;

        const ticket = await Ticket.findById(req.params.id);

        if (ticket) {
            ticket.status = status;
            ticket.ticketNumber = ticketNumber;
            ticket.productName = productName;
            ticket.revision = revision;
            ticket.quantity = quantity;
            ticket.lotNumber = lotNumber;
            ticket.partInventory = partInventory;
            ticket.stationRecords = stationRecords;

            const updatedTicket = await ticket.save();
            res.json(updatedTicket);
        } else {
            res.status(404);
            throw new Error("Ticket not found");
        }
    });

    static deleteTicket = asyncHandler(async (req: Request, res: Response) => {
        const ticket: TicketDocument | null = await Ticket.findById(req.params.id);
        if (ticket) {
            // @ts-ignore - TS doesn't like the mongoose delete method
            await ticket.remove();
            res.json({ message: "Ticket removed" });
        } else {
            res.status(404);
            throw new Error("Ticket not found");
        }
    });

    static getOpenTickets = asyncHandler(async (req: Request, res: Response) => {
        const tickets = await Ticket.find({ status: "Open" });
        res.json(tickets);
    });

    static getClosedTickets = asyncHandler(async (req: Request, res: Response) => {
        const tickets = await Ticket.find({ status: "Closed" });
        res.json(tickets);
    });

    static getInProgressTickets = asyncHandler(async (req: Request, res: Response) => {
        const tickets = await Ticket.find({ status: "In Progress" });
        res.json(tickets);
    });

    static searchTickets = asyncHandler(async (req: Request, res: Response) => {
        const { search } = req.body;
        const tickets = await Ticket.find({
            $or: [
                { status: { $regex: search, $options: "i" } },
                { ticketNumber: { $regex: search, $options: "i" } },
                { productName: { $regex: search, $options: "i" } },
                { revision: { $regex: search, $options: "i" } },
                { quantity: { $regex: search, $options: "i" } },
                { lotNumber: { $regex: search, $options: "i" } },
                { partInventory: { $regex: search, $options: "i" } },
                { stationRecords: { $regex: search, $options: "i" } },
            ],
        });
        res.json(tickets);
    });
}

export default TicketController;