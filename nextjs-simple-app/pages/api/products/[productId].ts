import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

import configDBMiddleware from 'middlewares/configDBMiddleware';
import Product from 'models/Product';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
        const product = await Product.findOneAndUpdate(
            { _id: req.query.productId },
            req.body,
            { new: true }
        ).lean();

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: {
                product,
            },
        });
    } else if (req.method === 'GET') {
        const product = await Product.findOne({ _id: req.query.productId });

        return res.status(200).json({
            success: true,
            message: 'Product returned successfully',
            data: {
                product,
            },
        });
    }
};

export default configDBMiddleware(handler);
