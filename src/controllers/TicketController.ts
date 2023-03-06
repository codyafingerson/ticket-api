import asyncHandler from "express-async-handler";
import Ticket, { TicketDocument } from "../models/Ticket";
import { Request, Response } from "express";

/**
 * Ticket controller class for handling ticket related requests and responses
 * @class TicketController
 * @exports TicketController
 */
class TicketController {

    /**
     * Create a new ticket in the database and return the created ticket
     * @param req Request object
     * @param res Response object
     * @returns Created ticket
     * @throws Error if ticket data is invalid
     * @static
     */
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

    /**
     * Get all tickets in the database and return them
     * @param req Request object
     * @param res Response object
     * @returns Array of tickets
     * @static
     */
    static getTickets = asyncHandler(async (req: Request, res: Response) => {
        const tickets = await Ticket.find({});
        res.json(tickets);
    });

    /**
     * Get a ticket by its id and return it
     * @param req Request object
     * @param res Response object
     * @returns Ticket
     * @throws Error if ticket is not found
     * @static
     */
    static getTicketById = asyncHandler(async (req: Request, res: Response) => {
        const ticket = await Ticket.findById(req.params.id);
        if (ticket) {
            res.json(ticket);
        } else {
            res.status(404);
            throw new Error("Ticket not found");
        }
    });

    /**
     * Update a ticket by its id and return the updated ticket
     * @param req Request object
     * @param res Response object
     * @returns Updated ticket
     * @throws Error if ticket is not found
     * @static
     */
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

    /**
     * Delete a ticket by its id
     * @param req Request object
     * @param res Response object
     * @returns Success message
     * @throws Error if ticket is not found
     * @static
     */
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

    /**
     * Get all tickets with a specific status
     * @param req Request object
     * @param res Response object
     * @returns Array of tickets
     * @static
     * 
     */
    static getOpenTickets = asyncHandler(async (req: Request, res: Response) => {
        const tickets = await Ticket.find({ status: "Open" });
        res.json(tickets);
    });

    /**
     * Get all tickets with a specific status
     * @param req Request object
     * @param res Response object
     * @returns Array of tickets
     * @static
     */
    static getClosedTickets = asyncHandler(async (req: Request, res: Response) => {
        const tickets = await Ticket.find({ status: "Closed" });
        res.json(tickets);
    });

    /**
     * Get all tickets with a specific status
     * @param req Request object
     * @param res Response object
     * @returns Array of tickets
     * @static
     */
    static getInProgressTickets = asyncHandler(async (req: Request, res: Response) => {
        const tickets = await Ticket.find({ status: "In Progress" });
        res.json(tickets);
    });

    /**
     * Get all tickets with a specific status
     * @param req Request object
     * @param res Response object
     * @returns Array of tickets
     * @static
     */
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