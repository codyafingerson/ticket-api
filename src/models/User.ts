import mongoose, { Schema, Document } from 'mongoose';

/**
 * User Interface
 * @interface UserDocument
 * @extends {Document}
 */
export interface UserDocument extends Document {
    isAdmin: boolean;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    remove: () => Promise<UserDocument>;
}

/**
 * User Schema
 */
const UserSchema: Schema = new Schema<UserDocument>({
    isAdmin: {
        type: Boolean,
        default: false,
        required: [true, 'Please specify if the user is an admin or a standard user']
    },
    firstName: {
        type: String,
        required: [true, 'Please provide a first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please provide a last name']
    },
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    }
},
{
    timestamps: true
});

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;