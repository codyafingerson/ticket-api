import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Ticket, { TicketDocument } from "../models/Ticket";
import { Request, Response } from "express";

/**
 * Ticket controller class for handling ticket related requests and responses
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
        if (tickets.length === 0) {
            res.status(404);
            throw new Error("No tickets found");
        }
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
     * Get all tickets with a specific status and return them
     * @param req Request object
     * @param res Response object
     * @returns Array of tickets
     * @static
     */
    static getTicketsByStatus = asyncHandler(async (req: Request, res: Response) => {
        const { status } = req.params;
        const tickets = await Ticket.find({ status });
        if (tickets.length === 0) {
            res.status(404);
            throw new Error("No tickets found");
        }
        res.json(tickets);
    });

    /**
     * Get all tickets with a specific ticket number and return them
     * @param req Request object
     * @param res Response object
     * @returns Array of tickets
     * @static
     */
    static noteHandler = asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const { method, params, body } = req;

        const { id } = params;

        switch (method) { 
            // If the request is a PUT request, add a note to the ticket
            case "PUT":
                try {
                    const ticket = await Ticket.findById(id);

                    if (!ticket) {
                        res.status(404).json({ message: "Ticket not found" });
                    }

                    const note = { body: body.body, createdBy: body.createdBy };
                    ticket.notes.push(note);
                    await ticket.save();

                    return res.status(201).json({ message: "Note added to ticket", note });
                } catch (error) {
                    res.status(500);
                    throw new Error("Server error");
                }
               
            case "DELETE":
                const { noteId } = params;
                try {
                    const ticket = await Ticket.findByIdAndUpdate(
                        id,
                        { $pull: { notes: { _id: noteId } } },
                        { new: true }
                    );
                    return res.status(200).json(ticket);
                } catch (error) {
                    res.status(500);
                    throw new Error("Server error");
                }
                
            default:
                return res.status(405).json({ message: "Method Not Allowed" });
               
        }
    });

    /**
     * Add a new component to a ticket or delete an existing component from a ticket
     * @param req Request object
     * @param res Response object
     * @returns Updated ticket
     * @throws Error if ticket is not found
     * @static
     */
    static partInventoryHandler = asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const { method } = req;
        const { partNumber, description, currentLot } = req.body;
        const { id } = req.params;
      
        try {
          const ticket: TicketDocument = await Ticket.findById(id);
      
          switch (method) {
            case "PUT":
              // Create a new component object
              const newPart = {
                partNumber,
                description,
                currentLot,
                id: new mongoose.Types.ObjectId()
              };
      
              // Add the new component to the ticket's components array
              ticket.partInventory.push(newPart);
      
              // Save the updated ticket
              const updatedTicket = await ticket.save();
      
              res.status(200).json(updatedTicket);
              break;
            case "DELETE":
              const { partId } = req.params;
              try {
                const ticket = await Ticket.findByIdAndUpdate(
                  id,
                  { $pull: { partInventory: { _id: partId } } },
                  { new: true }
                );
                return res.status(200).json(ticket);
              } catch (error) {
                res.status(500);
                throw new Error("Server error");
              }
            default:
              return res.status(405).json({ message: "Method Not Allowed" });
          }
      
        } catch (err) {
            res.status(500)
          throw new Error("Server error");
        }
      });
      
    /**
     * Add a new station record to a ticket or delete an existing station record from a ticket
     * @param req Request object
     * @param res Response object
     * @returns Updated ticket
     * @throws Error if ticket is not found
     * @static
     */
    static stationRecordsHandler = asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const { method } = req;
        const { station, completedBy, timeTaken, dateCompleted } = req.body;
        const { id } = req.params;

        try {
            const ticket: TicketDocument = await Ticket.findById(id);

            switch (method) {
                case "PUT":
                    try {
                        // Create a new station record object
                        const newStationRecord = {
                            station,
                            completedBy,
                            timeTaken,
                            dateCompleted,
                            id: new mongoose.Types.ObjectId()
                        };
                
                        // Add the new station record to the ticket's stationRecords array
                        ticket.stationRecords.push(newStationRecord);
                
                        // Save the updated ticket
                        const updatedTicket = await ticket.save();
                
                        return res.status(201).json(updatedTicket);
                    } catch (error) {
                        res.status(500);
                        throw new Error("Server error");
                    }
                case "DELETE":
                    const { recordId } = req.params;
                    try {
                        const ticket = await Ticket.findByIdAndUpdate(
                            id,
                            { $pull: { stationRecords: { _id: recordId } } },
                            { new: true }
                        );
                        return res.status(200).json(ticket);
                    } catch (error) {
                        res.status(500);
                        throw new Error("Server error");
                    }
                default:
                    return res.status(405).json({ message: "Method Not Allowed" });
            }
        } catch (err) {
            res.status(500);
            throw new Error("Server error");
        }
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