import UserModel from "../Models/UserModel";
// import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const maxAge = 3 * 24 * 60 * 60;

// const createToken = (id: String) => { 
//     return jwt.sign(
//         { id },
//         'chon',
//         { expiresIn: maxAge }
//     )
// }

export const Register = async (req:Request , res:Response) => { 

    const { email, password } = req.body;

    res.json({ email, password })
}

// module.exports.login = async (req, res) => { 
//     try {
//         const { email, password } = req.body;
//         const user = await UserModel.create({ email, password });
//         const token = createToken(user._id);

//         res.cookie('jwt', token, { 
//             withCredential: true,
//             httpOnly: false,
//             maxAge: maxAge * 1000
//         })

//         res.status(201).json({ user: user._id, created: true })

//     } catch (error) {
        
//     }
// }