import type { NextApiRequest, NextApiResponse } from 'next';

import configDBMiddleware from 'middlewares/configDBMiddleware';
import Product from 'models/Product';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const products = await Product.find({});

        return res.status(200).json({
            data: {
                count: products.length,
                products,
            },
        });
    }

    res.status(404).json({
        sucess: false,
        message: 'Did not manage to fetch data',
    });
};

export default configDBMiddleware(handler);
