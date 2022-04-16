import express, { Router } from "express";
import { addLottery, getLottery } from "../Controllers/LotteryController";
import { Authenticate } from "../Utility/vertifyHeader";

const router: Router = express.Router();
router.use(Authenticate);
router.get('/all', getLottery);
router.post('/', addLottery);

export { router as LotteryRoute };