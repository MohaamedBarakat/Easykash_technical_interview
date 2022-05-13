import {Request,Response,NextFunction} from 'express';
import db from '../models';

const AddTransaction = async(req: Request, res: Response, next: NextFunction) => {
    const title = req.body.title;
    const image = req.body.image;
    const price = req.body.price;
    const SellerId = req.query.sellerId;
    try {
        const transaction = await db.Transaction.build({
            title,
            image,
            price,
            SellerId
        });
        transaction.save();
        return res.status(200).json({
            message:"transaction procsseded"
        })
    } catch (err) {
        next(err);
    }
}

export default {
    AddTransaction
};