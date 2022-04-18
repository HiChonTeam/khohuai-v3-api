import { Request, Response, NextFunction } from 'express';

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const uid = req.session.uid;

    if (uid) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}