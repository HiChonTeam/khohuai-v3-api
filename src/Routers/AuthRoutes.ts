import express, { Router } from "express";
import { Register } from '../Controllers/AuthController';

const router: Router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World')
})
router.post('/register', Register);
// router.post('/login', login);


export { router as AuthRoute };