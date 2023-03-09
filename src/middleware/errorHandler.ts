import { Request, Response, NextFunction } from 'express'

/**
 * Error Handler: Catches all errors and returns a JSON response
 * @param {Error} err the error object
 * @param {Request} req the request object
 * @param {Response} res the response object
 * @param {NextFunction} next next function to call
 */
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    // res.json({
    //     message: err.message,
    //     stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    // })
    res.json({message: err.message})
}

export default errorHandler