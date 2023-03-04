import mongoose, { Schema, Document } from 'mongoose';


export interface ITemplateFile extends Document {
    name: string;
    data: string;
    size: number;
}
const TemplateFileSchema: Schema = new Schema({
    name: { type: String, required: true },
    data: { type: String, required: true },
    size: { type: Number, required: true },
});
    
const TemplateFile = mongoose.model<ITemplateFile>('TemplateFile', TemplateFileSchema);

export default TemplateFile;