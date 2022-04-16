import { Request, Response, NextFunction } from 'express';

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const validate = req.session.uid;

    if (validate) {
        next();
    } else {
        return res.json({ message: 'Unauthorized' });
    }
}