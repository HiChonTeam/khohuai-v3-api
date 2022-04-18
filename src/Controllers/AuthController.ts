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

    const role = 'member';
    const displayName = email.split('@')[0]

    const user = await User.create({ email, password: userPassword, salt, role, displayName });

    req.session.uid = user.id;
    req.session.loggedIn = true;
    req.session.user = { 
        role: user.role,
        displayName: user.displayName
    }

    return res.status(201).json({ loggedIn: true, role, message: 'Resgister success', user: req.session.user });
}

export const Login = async (req: Request, res: Response) => {
    try {

        const { email, password, remember } = req.body;
        const user = await User.findOne({ email });

        if (user) {

            const validation = await ValidatePassword(password, user.password, user.salt);

            if (validation) {
                req.session.uid = user.id;
                req.session.loggedIn = true;
                req.session.user = { 
                    role: user.role,
                    displayName: user.displayName
                }
                
                return res.status(201).json({ loggedIn: true, message: 'Login Success', user: req.session.user });
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
        res.json({ message: 'Logout success', loggedIn: false })
    })
}

export const LoggedIn = (req: Request, res: Response) => {

    const { loggedIn } = req.session;
    const { user } = req.session.user;

    if (loggedIn && user) {
        res.json({ loggedIn: loggedIn, user: req.session.user });
    }
    else {
        res.json({ loggedIn: false });
    }
}