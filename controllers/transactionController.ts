import {Request,Response,NextFunction} from 'express';
import db from '../models';
import sequelize from "sequelize";

const getTransactionSeller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = req.query.page || 0;
        const per_page = req.query.per_page || 0;
        const SellerId = req.query.seller_id;
        const date_range = req.query.date_range;
        const [start,end] = [new Date (13-5-2022),new Date(1-6-2022)]
        const skip: number = (+page - 1) * +per_page + 1;
        const totalTransactionSeller = await db.Transaction.count({
            where : 
            {
                SellerId : SellerId
            }
        })
        const transaction = await db.Transaction.findAll({
            limit: +per_page,
            offset: skip,
            attributes:
            {
                exclude: 
                [
                    'createdAt',
                    'SellerId'
                ]
            },
            where:
            {
                /*createdAt :
                {
                    [sequelize.Op.between]:[start,end]
                },*/
                SellerId: SellerId
            }
            
            


        });
        console.log(transaction);

        return res.status(200).json({
            transaction: transaction,
            paging:{
                total: totalTransactionSeller,
                current_page: page,
                per_page: per_page 
            }
        })
        

    } catch (err) {
        next(err);
    }
}

const AddTransaction = async(req: Request, res: Response, next: NextFunction) => {
    const title = req.body.title;
    const image = req.body.image;
    const price = req.body.price;
    const SellerId = req.query.seller_id;
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
    AddTransaction,
    getTransactionSeller
};