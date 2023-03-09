import { Request, Response, NextFunction } from "express";

/**
 * Redirects http requests to https 
 * @param {Request} req the request object
 * @param {Response} res the response object
 * @param next the next function to call
 */
function redirectHttp(req: Request, res: Response, next: NextFunction) {
    if (req.secure) {
      next();
    } else {
      res.redirect('https://' + req.headers.host + req.url);
    }
}

export default redirectHttp;