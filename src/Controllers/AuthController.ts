import User from "../Models/User";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';


const GenrateSalt = async () => {
    return await bcrypt.genSalt();
}

const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
}

const ValidatePassword = async (enterPassword: string, savedPassword: string, salt: string) => {

    return await GeneratePassword(enterPassword, salt) === savedPassword;
}


export const Register = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.json({ message: 'Email has already exist' })
    }

    const salt = await GenrateSalt();
    const userPassword = await GeneratePassword(password, salt);
    const user = await User.create({ email, password: userPassword, salt });

    req.session.uid = user.id;
    res.status(201).json({ user, created: true })
}

export const Login = async (req: Request, res: Response) => {
    try {

        const { email, password, remember } = req.body;
        const user = await User.findOne({ email });

        if (user) {

            const validation = await ValidatePassword(password, user.password, user.salt);

            if (validation) {
                req.session.uid = user.id;
                return res.status(201).json({ loggedIn: true, message: 'Login Success', user });
            }
            else {
                return res.json({ message: 'Password is not correct' })
            }

        }
        else {
            return res.json({ message: 'Email not found' })
        }

    } catch (error) {

    }
}

export const Logout = (req: Request, res: Response) => {
    req.session.destroy(() => {
        console.log(req.session)
        res.redirect('/')
    })
}

export const LoggedIn = (req: Request, res: Response) => {
    console.log(req.session);
    if (req.session) {
        res.json(req.session);
    }
    else {
        res.json({ message: 'Session Timeout' })
    }
}