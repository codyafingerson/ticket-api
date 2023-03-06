import mongoose, { Schema, Document } from 'mongoose';

export interface TemplateDocument extends Document {
    templateName: string;
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
    remove: () => Promise<TemplateDocument>;
}

const TemplateSchema: Schema = new Schema<TemplateDocument>({
    templateName: {
        type: String,
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
    }]
    },
    { timestamps: true }
);

const Template = mongoose.model<TemplateDocument>("Template", TemplateSchema);

export default Template;