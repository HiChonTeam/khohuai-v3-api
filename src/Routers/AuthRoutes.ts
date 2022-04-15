import express, { Router } from "express";
import { LoggedIn, Login, Logout, Register } from '../Controllers/AuthController';

const router: Router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.post('/logout', Logout);
router.get('/isLoggedIn', LoggedIn);

export { router as AuthRoute };