import mongoose, { Schema, Document } from 'mongoose';

interface ITemplateFile extends Document {
    name: string;
    data: string;
    size: number;
}
const TemplateFileSchema: Schema = new Schema({
    name: { type: String, required: true },
    data: { type: String, required: true },
    size: { type: Number, required: true },
});

export interface TicketDocument extends Document {
    status: string;
    ticketNumber: number;
    productName: string;
    revision: string;
    quantity: number;
    lotNumber: number;
    partInventory: [{
        partNumber: string;
        description: string;
        currentLot: string;
    }];
    stationRecords: [{
        station: string;
        completedBy: string;
        timeTaken: number;
        dateCompleted: Date;
    }];
    createdAt: Date;
    updatedAt: Date;
    templateFile?: ITemplateFile; // add the templateFile field to the interface
}
const TicketSchema: Schema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['open', 'in-progress', 'closed']
    },
    ticketNumber: {
        type: Number,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    revision: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    lotNumber: {
        type: Number
    },
    partInventory: [{
        partNumber: {
            type: String
        },
        description: {
            type: String
        },
        currentLot: {
            type: String
        }
    }],
    stationRecords: [{
        station: {
            type: String
        },
        completedBy: {
            type: String
        },
        timeTaken: {
            type: Number
        },
        dateCompleted: {
            type: Date
        }
    }],
    templateFile: TemplateFileSchema
},
{
    timestamps: true
});

const Ticket = mongoose.model<TicketDocument>('Ticket', TicketSchema);

export default Ticket;