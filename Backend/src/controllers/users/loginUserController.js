import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import selectUserByEmailModel from "../../models/users/selectUserByEmailModel.js";

import { invalidCredentialsError, pendingActivationError } from '../../services/errorService.js';

const loginUserController = async (req,res,next) => {
    try {
        const {email, password} = req.body;

        const user = await selectUserByEmailModel(email);

        let validPassword;

        if(user){
            validPassword = await bcrypt.compare(password, user.password);
        }

        if(!user || !validPassword){
            invalidCredentialsError();
        }

        if(!user.active){
            pendingActivationError();
        }

        // generamos el token
        const tokenInfo = {
            id: user.id,
            role: user.role
        };

        const token = jwt.sign(tokenInfo, process.env.SECRET,{
            expiresIn: '3d'
        });

        res.send({
            status: 'ok',
            data: {
                token,
                uid: user.id, 
                username: user.username,
                email: user.email,
            }
        })

    } catch (error) {
        next(error);
    }
};

export default loginUserController;