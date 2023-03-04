import { Request, Response, NextFunction } from "express";

function redirectHttp(req: Request, res: Response, next: NextFunction) {
    if (req.secure) {
      next();
    } else {
      res.redirect('https://' + req.headers.host + req.url);
    }
}

export default redirectHttp;