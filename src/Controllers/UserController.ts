import User from "../Models/User";
import { Request, Response } from 'express';

export const getProfile = async (req: Request, res: Response) => { 

    const uid =  req.session.uid;

    try {
        const data = await User.findById(uid);
        res.json(data);
        
    } catch (error) {
        console.log(error)
    }
}