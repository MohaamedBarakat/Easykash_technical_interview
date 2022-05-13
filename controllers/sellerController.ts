import {Request,Response,NextFunction} from 'express';
import db from '../models';

const AddSeller = async(req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    try {
        const seller = await db.Seller.build({
            name,
            password,
            email
        });
        seller.save();
        return res.status(200).json({message:"data inserted"})
    } catch (err) {
        next(err);
    }
}

export default {
    AddSeller
};