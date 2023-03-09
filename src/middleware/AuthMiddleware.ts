import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import User, { UserDocument } from '../models/User';

interface AuthenticatedRequest extends Request {
    user?: UserDocument;
}

class AuthMiddleware {
    static verifyJWT = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        let token: string | undefined;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                // Get token from header
                token = req.headers.authorization.split(' ')[1];
                // Verify token
                const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
                // Get user from token
                req.user = await User.findById(decoded.id).select('-password') as UserDocument;

                next();
            } catch (error) {
                console.log(error);
                res.status(401);
                throw new Error('Not authorized');
            }
        }

        if (!token) {
            res.status(401);
            throw new Error('Not authorized');
        }
    });

    static isAdmin = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user?.isAdmin) {
            res.status(403);
            throw new Error('Not authorized as an admin');
        }
        next();
    });
}

export default AuthMiddleware;