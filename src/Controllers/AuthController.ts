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
    const user = await User.create({ email, password: userPassword, salt, role: 'member' });

    req.session.uid = user.id;
    req.session.loggedIn = true;
    req.session.role = 'member';
    return res.status(201).json({ loggedIn: true, role: 'member' , message: 'Resgister success' });
}

export const Login = async (req: Request, res: Response) => {
    try {

        const { email, password, remember } = req.body;
        const user = await User.findOne({ email });

        if (user) {

            const validation = await ValidatePassword(password, user.password, user.salt);

            const role = user.role;

            if (validation) {
                req.session.uid = user.id;
                req.session.loggedIn = true;
                req.session.role = 'member';
                return res.status(201).json({ loggedIn: true, role , message: 'Login Success' });
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
        res.json({ message: 'Logout success', loggedIn: false, role: '' })
    })
}

export const LoggedIn = (req: Request, res: Response) => {

    const { loggedIn, role } = req.session;

    if (loggedIn && role) {
        res.json({ loggedIn: loggedIn, role: role });
    }
    else {
        res.json({ loggedIn: false, role: '' });
    }
}