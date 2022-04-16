import express, { Router } from "express";
import { Authenticate } from "../Utility/vertifyHeader";
import { getProfile } from "../Controllers/UserController";

const router: Router = express.Router();
router.use(Authenticate);
router.get('/me', getProfile);

export { router as UserRoute };