import { Request, Response, NextFunction } from 'express';

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {

    req.session.uid = '6259446c188e417abf8525c6';
    const validate = req.session.uid;

    if (validate) {
        next();
    } else {
        return res.json({ message: 'Unauthorized' });
    }
}