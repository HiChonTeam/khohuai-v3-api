import Lottery from "../Models/Lottery";
import { Request, Response } from 'express';

export const addLottery = async (req: Request, res: Response) => {

    const data = req.body;

    try {

        const number = data.number;

        const existingLottery = await Lottery.findOne({ number });

        if (existingLottery) {
            existingLottery.qty += data.qty;
            existingLottery.save();
            res.json({ meaages: 'Add qty', existingLottery });
        } 
        else {
            const newData = await Lottery.create(data);
            res.json({ meaages: 'Add success', newData });
        }

    } catch (error) {
        console.log(error)
    }
}

export const getLottery = async (req: Request, res: Response) => {
    try {
        const data = await Lottery.find();
        res.json(data);

    } catch (error) {

    }
}