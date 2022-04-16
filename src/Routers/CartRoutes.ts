import express, { Router } from "express";
import { UpdateCart, getMyCart } from "../Controllers/CartController";
import { Authenticate } from "../Utility/vertifyHeader";

const router: Router = express.Router();
router.use(Authenticate);

router.get('/', getMyCart);
router.put('/', UpdateCart);


export { router as CartRoutes };