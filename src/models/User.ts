import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
    isAdmin: boolean;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
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
    email: {
        type: String,
        unique: true
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