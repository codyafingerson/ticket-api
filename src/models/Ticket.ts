import mongoose, { Schema, Document } from 'mongoose';

export interface TicketDocument extends Document {
    status: string;
    ticketNumber: number;
    productName: string;
    revision: string;
    quantity: number;
    lotNumber: number;
    notes: [{
        body: string;
        createdBy: string;
    }];
    partInventory: [{
        id: mongoose.Types.ObjectId;
        partNumber: string;
        description: string;
        currentLot: string;
    }];
    stationRecords: [{
        id: mongoose.Types.ObjectId;
        station: string;
        completedBy: string;
        timeTaken: number;
        dateCompleted: Date;
    }];
    createdAt: Date;
    updatedAt: Date;
    remove: () => Promise<TicketDocument>;
}

const TicketSchema: Schema = new Schema<TicketDocument>({
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
    notes: [{
        body: {
            type: String,
            maxLength: 255,
        },
        createdBy: {
            type: String,
        },
    }],
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
    }]
},
    {
        timestamps: true
    });

const Ticket = mongoose.model<TicketDocument>('Ticket', TicketSchema);

export default Ticket;